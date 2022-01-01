const express = require('express');
const router = express.Router();
const financeController = require("../controllers/financeController");

router.get("/", financeController.getAllFinances);
router.get("/:id", financeController.getFinanceById);

router.post("/", financeController.postFinance);

router.put("/", financeController.updateFinance);

router.delete("/:id", financeController.deleteFinance);

module.exports = router;