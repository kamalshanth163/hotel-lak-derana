const express = require('express');
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.get("/", attendanceController.getAllAttendances);
router.get("/:id", attendanceController.getAttendanceById);

router.post("/", attendanceController.postAttendance);

router.put("/", attendanceController.updateAttendance);

router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;