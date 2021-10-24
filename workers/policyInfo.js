const { workerData, parentPort } = require("worker_threads");
const PolicyInfoModel = require("../models/PolicyInfoModel");
const _ = require("lodash");

const getData = new Promise(async (resolve, reject) => {
    const { xlData, userList, policyCategoryList, policyCarrierList } = workerData;
    await PolicyInfoModel.deleteMany();
    const policyInfoData = xlData.reduce((res, curr) => {
        return [
            ...res,
            {
                ...curr,
                policyCategoryId: policyCategoryList.find(
                    (x) => x.category_name == curr.category_name
                )._id,
                policyCarrierId: policyCarrierList.find((x) => x.company_name == curr.company_name)
                    ._id,
                userId: userList.find((x) => x.firstname == curr.firstname && x.email == curr.email)
                    ._id,
            },
        ];
    }, []);
    const data = await PolicyInfoModel.insertMany([...policyInfoData]);
    resolve(data);
});
getData.then((res) => parentPort.postMessage(JSON.stringify(res)));
