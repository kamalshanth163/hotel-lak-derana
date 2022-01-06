const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllCustomers = (req, res) => {
    sqlCon.query("SELECT * FROM customers", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getCustomerById = (req, res) => {
    sqlCon.query(`SELECT * FROM customers WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postCustomer = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO customers (name, address, phone, created_at, updated_at)
        SELECT ?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM customers
            WHERE name = '${req.body.name}'
        )
        LIMIT 1;`,
        [
            req.body.name,
            req.body.address,
            req.body.phone,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateCustomer = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE customers 
        SET 
        name = '${req.body.name}',
        address = '${req.body.address}',
        phone = '${req.body.phone}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteCustomer = (req, res) => {
    sqlCon.query(
        `DELETE FROM customers WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    postCustomer,
    updateCustomer,
    deleteCustomer
};

