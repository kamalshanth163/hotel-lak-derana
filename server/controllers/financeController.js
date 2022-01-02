const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService')

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
    var localDateTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO finances (amount, payer, description, recorded_by, date)
        VALUES (?,?,?,?,?);`,
        [
            req.body.amount,
            req.body.payer,
            req.body.description,
            req.body.recorded_by,
            localDateTime,
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateFinance = (req, res) => {
    sqlCon.query(
        `UPDATE finances 
        SET 
        amount = '${req.body.amount}',
        payer = '${req.body.payer}',
        description = '${req.body.description}',
        recorded_by = '${req.body.recorded_by}'
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

