require("dotenv").config();
module.exports = {
    development: { host: process.env.MONGODB_URL },
};
