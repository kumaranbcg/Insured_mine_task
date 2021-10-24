require("dotenv/config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const routers = require("./routes/index.js");
const appLogger = require("./utils/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
require("./utils/cpuUtilization")();
// middle wares section
app.enable("trust proxy");
app.use(appLogger.requestDetails(appLogger));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, null));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
app.use(routers);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`App listening at port ${port}`));
module.exports = server;
