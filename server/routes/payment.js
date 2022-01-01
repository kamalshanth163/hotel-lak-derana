const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPaymentById);

router.post("/", paymentController.postPayment);

router.put("/", paymentController.updatePayment);

router.delete("/:id", paymentController.deletePayment);

module.exports = router;