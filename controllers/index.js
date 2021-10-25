const service = require("./../services");
const errorCodes = require("./../constants/errorCodes.js");
const { response } = require("../utils");
class Controller {
    async excelMigrate(req, res) {
        try {
            const result = await service.excelMigrateService({ ...req.files[0] });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getPolicyInfo(req, res) {
        try {
            const result = await service.getPolicyInfoService({ ...req.query });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getUsersPolicy(req, res) {
        try {
            const result = await service.getUsersPolicyService({ ...req.query });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async insertMessage(req, res) {
        try {
            const result = await service.insertMessageService({ ...req.body });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getMessage(req, res) {
        try {
            const result = await service.getMessageService();
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async insertMessageTwo(req, res) {
        try {
            const result = await service.insertMessageTwoService({ ...req.body });
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
    async getMessageTwo(req, res) {
        try {
            const result = await service.getMessageTwoService();
            response.success(req, res, result.code, result.data, result.message);
        } catch (err) {
            response.error(req, res, errorCodes.HTTP_INTERNAL_SERVER_ERROR, err);
        }
    }
}
module.exports = new Controller();
