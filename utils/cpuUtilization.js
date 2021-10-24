const cpuUtilization = () => {
    setInterval(() => {
        const pm2 = require("pm2");
        pm2.describe("myApp", (err, proc) => {
            if (proc[0].monit.cpu > 70) {
                pm2.restart("myApp");
            }
        });
    }, 5000);
};
module.exports = cpuUtilization;
