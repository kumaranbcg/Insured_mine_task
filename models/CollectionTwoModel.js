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

/**
exports = async function (changeEvent) {
    const mongodb = context.services.get("mycluster");
    const CollectionOneModel = mongodb.db("InsuredMine_Db").collection("collectionOne");
    const CollectionTwoModel = mongodb.db("InsuredMine_Db").collection("collectionTwo");
    const minutesToAdd = 1;
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
    const data = await CollectionOneModel.find({
        $expr: {
            $and: [{ $eq: ["$isInserted", false] }, { $lte: ["$dateTime", futureDate] }],
        },
    }).toArray();
    const insertData = data.reduce(
        (res, curr) => [
            ...res,
            {
                message: curr.message,
                dateTime: curr.dateTime,
                createdAt: new Date(),
                updateAt: new Date(),
            },
        ],
        []
    );
    await CollectionOneModel.updateMany(
        {
            $expr: {
                $and: [{ $eq: ["$isInserted", false] }, { $lte: ["$dateTime", futureDate] }],
            },
        },
        {
            $set: { isInserted: true },
        }
    );
    if (insertData.length) await CollectionTwoModel.insertMany([...insertData]);
};
 */
