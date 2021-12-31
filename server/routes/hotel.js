const express = require('express');
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.get("/", hotelController.getAllHotels);
router.get("/:id", hotelController.getHotelById);

router.post("/", hotelController.postHotel);

router.put("/", hotelController.updateHotel);

router.delete("/:id", hotelController.deleteHotel);

module.exports = router;


