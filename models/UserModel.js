const mongoose = require(".");
const UserSchema = new mongoose.Schema(
    {
        firstname: { type: String },
        dob: { type: Date },
        phone: { type: String },
        address: { type: String },
        state: { type: String },
        zip: { type: String },
        email: { type: String },
        gender: { type: String },
        userType: { type: String },
        status: { type: Boolean, required: true, default: 1 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", UserSchema, "user");
