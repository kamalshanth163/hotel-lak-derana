const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const Seed = require("./db/seed");

require('dotenv').config();

const employeeRoutes = require("./routes/employee");
const hotelRoutes = require("./routes/hotel");
const roomRoutes = require("./routes/room");
const customerRoutes = require("./routes/customer");
const reservationRoutes = require("./routes/reservation");
const paymentRoutes = require("./routes/payment");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/employees", employeeRoutes);
app.use("/hotels", hotelRoutes);
app.use("/rooms", roomRoutes);
app.use("/customers", customerRoutes);
app.use("/reservations", reservationRoutes);
app.use("/payments", paymentRoutes);

let seed = new Seed();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})