const { workerData, parentPort } = require("worker_threads");
const PolicyCarrierModel = require("../models/PolicyCarrierModel");
const _ = require("lodash");

const getData = new Promise(async (resolve, reject) => {
    await PolicyCarrierModel.deleteMany();
    const policyCarrierData = _.uniqBy(workerData, "company_name").reduce(
        (res, { company_name }) => [...res, { company_name }],
        []
    );
    const data = await PolicyCarrierModel.insertMany([...policyCarrierData]);
    resolve(data);
});
getData.then((res) => parentPort.postMessage(JSON.stringify(res)));
