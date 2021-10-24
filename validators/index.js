const BaseJoi = require("joi");
const response = require("../utils/response");
const schemas = {
    getPolicyInfo: BaseJoi.object({
        userName: BaseJoi.optional(),
        page: BaseJoi.number().required(),
        limit: BaseJoi.number().required(),
    }),
    getUsersPolicy: BaseJoi.object({
        page: BaseJoi.number().required(),
        limit: BaseJoi.number().required(),
    }),
    insertMessage: BaseJoi.object({
        message: BaseJoi.string().required(),
        dateTime: BaseJoi.date().required().greater(Date.now()),
    }),
};

const options = {
    basic: { abortEarly: false, convert: true, allowUnknown: false, stripUnknown: true },
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: { objects: true },
    },
};

const getPolicyInfo = async (req, res, next) => {
    var schema = schemas.getPolicyInfo;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        response.joierrors(req, res, err);
    }
};
const getUsersPolicy = async (req, res, next) => {
    var schema = schemas.getUsersPolicy;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.query }, option);
        next();
    } catch (err) {
        response.joierrors(req, res, err);
    }
};
const insertMessage = async (req, res, next) => {
    var schema = schemas.insertMessage;
    let option = options.basic;
    try {
        await schema.validateAsync({ ...req.body }, option);
        next();
    } catch (err) {
        response.joierrors(req, res, err);
    }
};

module.exports = { getPolicyInfo, getUsersPolicy, insertMessage };
