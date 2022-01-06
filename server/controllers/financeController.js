const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllFinances = (req, res) => {
    sqlCon.query("SELECT * FROM finances", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getFinanceById = (req, res) => {
    sqlCon.query(`SELECT * FROM finances WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postFinance = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO finances (amount, payer, description, recorded_by, created_at, updated_at)
        VALUES (?,?,?,?,?,?);`,
        [
            req.body.amount,
            req.body.payer,
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

const updateFinance = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();

    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE finances 
        SET 
        amount = '${req.body.amount}',
        payer = '${req.body.payer}',
        description = '${req.body.description}',
        recorded_by = '${req.body.recorded_by}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteFinance = (req, res) => {
    sqlCon.query(
        `DELETE FROM finances WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllFinances,
    getFinanceById,
    postFinance,
    updateFinance,
    deleteFinance
};