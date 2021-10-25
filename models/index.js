const mongoose = require("mongoose");
const config = require("../config/config")[process.env.NODE_ENV || "development"];
mongoose.connect(config.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
module.exports = mongoose;
