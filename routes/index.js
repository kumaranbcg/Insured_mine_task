const express = require("express");
const router = express.Router();
const env = process.env.NODE_ENV || "development";
const v1Routes = require("./v1");
const moment = require("moment");
const dateTime = moment().format("DD-MMM-YYYY hh:mm:ss a");
router.use((req, res, next) => {
    if (/healthCheck/gi.test(req.url)) {
        res.send(`
            <table>
                <tbody>
                    <tr>
                        <td><b>Server Status</b></td>
                        <td>: I am working fine</td>
                    </tr>
                    <tr>
                        <td><b>Last Code Updated At</b></td>
                        <td>: ${dateTime}</td>
                    </tr>
                    <tr>
                        <td><b>ENV</b></td>
                        <td>: ${env}</td>
                    </tr>
                </tbody>
            </table>
        `);
    } else next();
});
router.use("/insuredMine/v1/api", v1Routes);
module.exports = router;
