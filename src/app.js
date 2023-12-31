const express = require("express");
const dotenv = require("dotenv");

const ModuleRouter = require("./modules/route");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const white_list = ["http://localhost:3000","http://localhost:5173"];
const cor_options = {
    origin: (origin, callback) => {
        if (white_list.includes(origin) || !origin) {
            callback(null, true);
        } else {
            // callback(new Error("Not Allowed by cors"));
        }
    },
};

const app = express();
app.use(cors(cor_options));
app.use(bodyParser.json());
const port = process.env.PORT ?? 8000;

app.use("/", ModuleRouter);

app.listen(port, () => {
    console.log(
        `server is listening on ${port}, click on http://localhost:${port}`
    );
});
