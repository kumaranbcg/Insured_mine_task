const mongoose = require(".");
const CollectionFourSchema = new mongoose.Schema(
    {
        message: { type: String },
        dateTime: { type: Date },
        status: { type: Boolean, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("collectionFour", CollectionFourSchema, "collectionFour");

/**
exports = async function (changeEvent) {
    const mongodb = context.services.get("mycluster");
    const CollectionFourModel = mongodb.db("InsuredMine_Db").collection("collectionFour");
    const { message, dateTime } = changeEvent.fullDocumentBeforeChange;
    await CollectionFourModel.insertOne({ message, dateTime, createdAt: new Date(), updateAt: new Date() });
}
 */
