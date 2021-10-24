const express = require("express");
const controller = require("../../controllers");
const router = express.Router();
const docUpload = require("../../utils/docUpload");
const validators = require("../../validators");

router.post("/excelMigrate", docUpload, controller.excelMigrate);
router.get("/getPolicyInfo", validators.getPolicyInfo, controller.getPolicyInfo);
router.get("/getUsersPolicy", validators.getUsersPolicy, controller.getUsersPolicy);
router.post("/insertMessage", validators.insertMessage, controller.insertMessage);
router.get("/getMessage", controller.getMessage);

module.exports = router;
