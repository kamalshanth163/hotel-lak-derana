const express = require("express");
const bodyParser = require("body-parser");
const Seed = require("./db/seed");
const db = require("./db/connection");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

let seed = new Seed();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})