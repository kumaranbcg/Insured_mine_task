const mongoose = require(".");
const CollectionOneSchema = new mongoose.Schema(
    {
        message: { type: String },
        dateTime: { type: Date },
        isInserted: { type: Boolean, default: 0 },
        status: { type: Boolean, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("collectionOne", CollectionOneSchema, "collectionOne");
