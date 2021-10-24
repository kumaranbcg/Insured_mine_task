const mongoose = require(".");
const Schema = mongoose.Schema;
const PolicyInfoSchema = new Schema(
    {
        policy_number: { type: String },
        policy_start_date: { type: Date },
        policy_end_date: { type: Date },
        policyCategoryId: { type: Schema.Types.ObjectId, ref: "policyCategory" },
        policyCarrierId: { type: Schema.Types.ObjectId, ref: "policyCarrier" },
        userId: { type: Schema.Types.ObjectId, ref: "user" },
        status: { type: Boolean, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("policyInfo", PolicyInfoSchema, "policyInfo");
