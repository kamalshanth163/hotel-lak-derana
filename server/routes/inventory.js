const express = require('express');
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getAllInventories);
router.get("/:id", inventoryController.getInventoryById);

router.post("/", inventoryController.postInventory);

router.put("/", inventoryController.updateInventory);

router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;