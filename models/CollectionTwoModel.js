const mongoose = require(".");
const CollectionTwoSchema = new mongoose.Schema(
    {
        message: { type: String },
        dateTime: { type: Date },
        status: { type: Boolean, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("collectionTwo", CollectionTwoSchema, "collectionTwo");
