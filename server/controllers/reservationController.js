const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllReservations = (req, res) => {
    sqlCon.query("SELECT * FROM reservations", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getReservationById = (req, res) => {
    sqlCon.query(`SELECT * FROM reservations WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postReservation = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO reservations (adults_count, children_count, customer_id, room_id, checked_out, created_at, updated_at)
        SELECT ?,?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM reservations
            WHERE room_id = '${req.body.room_id}'
        )
        LIMIT 1;`,
        [
            req.body.adults_count,
            req.body.children_count,
            req.body.customer_id,
            req.body.room_id,
            req.body.checked_out,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateReservation = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE reservations 
        SET 
        adults_count = '${req.body.adults_count}',
        children_count = '${req.body.children_count}',
        customer_id = '${req.body.customer_id}',
        room_id = '${req.body.room_id}',
        checked_out = '${req.body.checked_out}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteReservation = (req, res) => {
    sqlCon.query(
        `DELETE FROM reservations WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllReservations,
    getReservationById,
    postReservation,
    updateReservation,
    deleteReservation
};

