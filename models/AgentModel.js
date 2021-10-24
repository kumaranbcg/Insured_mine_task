const mongoose = require(".");
const Schema = mongoose.Schema;
const AgentSchema = new Schema(
    {
        agent: { type: String },
        status: { type: Boolean, default: 1 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("agent", AgentSchema, "agent");
