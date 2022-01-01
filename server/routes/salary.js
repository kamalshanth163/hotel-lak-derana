const express = require('express');
const router = express.Router();
const salaryController = require("../controllers/salaryController");

router.get("/", salaryController.getAllSalaries);
router.get("/:id", salaryController.getSalaryById);

router.post("/", salaryController.postSalary);

router.put("/", salaryController.updateSalary);

router.delete("/:id", salaryController.deleteSalary);

module.exports = router;