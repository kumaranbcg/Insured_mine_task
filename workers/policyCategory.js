const { workerData, parentPort } = require("worker_threads");
const PolicyCategoryModel = require("../models/PolicyCategoryModel");
const _ = require("lodash");

const getData = new Promise(async (resolve, reject) => {
    await PolicyCategoryModel.deleteMany();
    const policyCategoryData = _.uniqBy(workerData, "category_name").reduce(
        (res, { category_name }) => [...res, { category_name }],
        []
    );
    const data = await PolicyCategoryModel.insertMany([...policyCategoryData]);
    resolve(data);
});
getData.then((res) => parentPort.postMessage(JSON.stringify(res)));
