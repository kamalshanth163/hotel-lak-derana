const express = require('express');
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);

router.post("/", employeeController.postEmployee);
router.post("/login", employeeController.loginEmployee);

module.exports = router;


