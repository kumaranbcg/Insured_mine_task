const xlsx = require("xlsx");
const messages = require("./../constants/errorMsgs.js");
const errorCodes = require("./../constants/errorCodes.js");
const { Worker } = require("worker_threads");
const PolicyInfoModel = require("../models/PolicyInfoModel");
const UserModel = require("../models/UserModel");
const CollectionOneModel = require("../models/CollectionOneModel");
const CollectionTwoModel = require("../models/CollectionTwoModel");
const fs = require("fs");

class Service {
    async userWorker(workerData) {
        return new Promise((resolve, reject) => {
            const worker = new Worker("./workers/user.js", { workerData });
            worker.on("message", (message) => resolve(JSON.parse(message)));
            worker.on("error", reject);
            worker.on("exit", (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
    async agentWorker(workerData) {
        return new Promise((resolve, reject) => {
            const worker = new Worker("./workers/agent.js", { workerData });
            worker.on("message", (message) => resolve(JSON.parse(message)));
            worker.on("error", reject);
            worker.on("exit", (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
    async policyCategoryWorker(workerData) {
        return new Promise((resolve, reject) => {
            const worker = new Worker("./workers/policyCategory.js", { workerData });
            worker.on("message", (message) => resolve(JSON.parse(message)));
            worker.on("error", reject);
            worker.on("exit", (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
    async policyCarrierWorker(workerData) {
        return new Promise((resolve, reject) => {
            const worker = new Worker("./workers/policyCarrier.js", { workerData });
            worker.on("message", (message) => resolve(JSON.parse(message)));
            worker.on("error", reject);
            worker.on("exit", (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
    async policyInfoWorker(xlData, userList, policyCategoryList, policyCarrierList) {
        return new Promise((resolve, reject) => {
            const worker = new Worker("./workers/policyInfo.js", {
                workerData: { xlData, userList, policyCategoryList, policyCarrierList },
            });
            worker.on("message", (message) => resolve(JSON.parse(message)));
            worker.on("error", reject);
            worker.on("exit", (code) => {
                if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
    async excelMigrateService(params) {
        try {
            const filePath = `${params.destination}/${params.filename}`;
            const workbook = xlsx.readFile(filePath);
            const sheet_name_list = workbook.SheetNames;
            const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            const userList = await this.userWorker(xlData);
            const [policyCategoryList, policyCarrierList] = await Promise.all([
                this.policyCategoryWorker(xlData),
                this.policyCarrierWorker(xlData),
                this.agentWorker(xlData),
            ]);
            await this.policyInfoWorker(xlData, userList, policyCategoryList, policyCarrierList);
            fs.unlinkSync(filePath);
            return { code: errorCodes.HTTP_OK, message: messages.success };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async getPolicyInfoService(params) {
        try {
            const { userName = "", page = 1, limit = 10 } = params;
            const data = await PolicyInfoModel.aggregate([
                {
                    $lookup: {
                        from: "user",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $match: { "user.firstname": { $regex: userName, $options: "i" } } },
                { $unwind: { path: "$user" } },
                {
                    $project: {
                        _id: 1,
                        policy_number: 1,
                        policy_start_date: 1,
                        policy_end_date: 1,
                        "user._id": 1,
                        "user.firstname": 1,
                    },
                },
                {
                    $facet: {
                        metaData: [
                            { $count: "total" },
                            { $addFields: { page: parseInt(page), limit: parseInt(limit) } },
                        ],
                        list: [
                            { $skip: parseInt((page - 1) * limit) },
                            { $limit: parseInt(limit) },
                        ],
                    },
                },
                { $unwind: { path: "$metaData" } },
            ]);
            return { code: errorCodes.HTTP_OK, message: messages.success, data };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async getUsersPolicyService(params) {
        try {
            const { page = 1, limit = 10 } = params;
            const data = await UserModel.aggregate([
                {
                    $lookup: {
                        from: "policyInfo",
                        let: { id: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$userId", "$$id"] } } },
                            {
                                $lookup: {
                                    from: "policyCategory",
                                    localField: "policyCategoryId",
                                    foreignField: "_id",
                                    as: "policyCategory",
                                },
                            },
                            {
                                $lookup: {
                                    from: "policyCarrier",
                                    localField: "policyCarrierId",
                                    foreignField: "_id",
                                    as: "policyCarrier",
                                },
                            },
                            { $unwind: { path: "$policyCategory" } },
                            { $unwind: { path: "$policyCarrier" } },
                            {
                                $project: {
                                    _id: 1,
                                    policy_number: 1,
                                    policy_start_date: 1,
                                    policy_end_date: 1,
                                    "policyCategory._id": 1,
                                    "policyCategory.category_name": 1,
                                    "policyCarrier._id": 1,
                                    "policyCarrier.company_name": 1,
                                },
                            },
                        ],
                        as: "policyInfo",
                    },
                },
                { $unwind: { path: "$policyInfo" } },
                {
                    $project: {
                        _id: 1,
                        userType: 1,
                        email: 1,
                        firstname: 1,
                        phone: 1,
                        address: 1,
                        state: 1,
                        zip: 1,
                        dob: 1,
                        policyInfo: 1,
                    },
                },
                {
                    $facet: {
                        metaData: [
                            { $count: "total" },
                            { $addFields: { page: parseInt(page), limit: parseInt(limit) } },
                        ],
                        list: [
                            { $skip: parseInt((page - 1) * limit) },
                            { $limit: parseInt(limit) },
                        ],
                    },
                },
                { $unwind: { path: "$metaData" } },
            ]);
            return { code: errorCodes.HTTP_OK, message: messages.success, data };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async insertMessageService(params) {
        try {
            await CollectionOneModel.create({ ...params });
            return { code: errorCodes.HTTP_OK, message: messages.success };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
    async getMessageService() {
        try {
            const data = await CollectionTwoModel.find();
            return { code: errorCodes.HTTP_OK, message: messages.success, data };
        } catch (err) {
            return { code: errorCodes.HTTP_INTERNAL_SERVER_ERROR, message: err };
        }
    }
}
module.exports = new Service();
