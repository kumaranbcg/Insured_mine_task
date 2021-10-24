const { workerData, parentPort } = require("worker_threads");
const AgentModel = require("../models/AgentModel");
const _ = require("lodash");

const getData = new Promise(async (resolve, reject) => {
    await AgentModel.deleteMany();
    const agentData = _.uniqBy(workerData, "agent").reduce(
        (res, { agent }) => [...res, { agent }],
        []
    );
    const data = await AgentModel.insertMany([...agentData]);
    resolve(data);
});
getData.then((res) => parentPort.postMessage(JSON.stringify(res)));
