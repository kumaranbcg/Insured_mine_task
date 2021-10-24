const { workerData, parentPort } = require("worker_threads");
const UserModel = require("../models/UserModel");
const getData = new Promise(async (resolve, reject) => {
    await UserModel.deleteMany();
    const userData = workerData.reduce((res, curr) => [...res, { ...curr }], []);
    const data = await UserModel.insertMany([...userData]);
    resolve(data);
});
getData.then((res) => parentPort.postMessage(JSON.stringify(res)));
