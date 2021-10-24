const mongoose = require(".");
const Schema = mongoose.Schema;
const PolicyCarrierSchema = new Schema(
    {
        company_name: { type: String },
        status: { type: Boolean, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("policyCarrier", PolicyCarrierSchema, "policyCarrier");
