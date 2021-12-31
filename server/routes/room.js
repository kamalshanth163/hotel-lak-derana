const express = require('express');
const router = express.Router();
const roomController = require("../controllers/roomController");

router.get("/", roomController.getAllRooms);
router.get("/:id", roomController.getRoomById);

router.post("/", roomController.postRoom);

router.put("/", roomController.updateRoom);

router.delete("/:id", roomController.deleteRoom);

module.exports = router;


