const mongoose = require(".");
const Schema = mongoose.Schema;
const PolicyCategorySchema = new Schema(
    {
        category_name: { type: String },
        status: { type: Boolean, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("policyCategory", PolicyCategorySchema, "policyCategory");
