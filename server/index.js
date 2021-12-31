const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const Seed = require("./db/seed");

require('dotenv').config();

const employeeRoutes = require("./routes/employee");
const hotelRoutes = require("./routes/hotel");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/employees", employeeRoutes);
app.use("/hotels", hotelRoutes);

let seed = new Seed();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})