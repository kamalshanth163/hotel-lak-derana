const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllInventories = (req, res) => {
    sqlCon.query("SELECT * FROM inventories", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getInventoryById = (req, res) => {
    sqlCon.query(`SELECT * FROM inventories WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postInventory = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO inventories (product, quantity, price, seller, department, description, recorded_by, created_at, updated_at)
        VALUES (?,?,?,?,?,?,?,?,?);`,
        [
            req.body.product,
            req.body.quantity,
            req.body.price,
            req.body.seller,
            req.body.department,
            req.body.description,
            req.body.recorded_by,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateInventory = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE inventories
        SET 
        product = '${req.body.product}',
        quantity = '${req.body.quantity}',
        price = '${req.body.price}',
        seller = '${req.body.seller}',
        department = '${req.body.department}',
        description = '${req.body.description}',
        recorded_by = '${req.body.recorded_by}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteInventory = (req, res) => {
    sqlCon.query(
        `DELETE FROM inventories WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllInventories,
    getInventoryById,
    postInventory,
    updateInventory,
    deleteInventory
};

