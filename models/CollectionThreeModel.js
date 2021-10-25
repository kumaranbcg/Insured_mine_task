const mongoose = require(".");
const CollectionThreeSchema = new mongoose.Schema(
    {
        message: { type: String },
        dateTime: { type: Date, expires: 0 },
        status: { type: Boolean, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("collectionThree", CollectionThreeSchema, "collectionThree");
