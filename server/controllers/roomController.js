const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllRooms = (req, res) => {
    sqlCon.query("SELECT * FROM rooms", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getRoomById = (req, res) => {
    sqlCon.query(`SELECT * FROM rooms WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postRoom = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO rooms (number, availability, type, hotel_id, created_at, updated_at)
        SELECT ?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM rooms
            WHERE number = '${req.body.number}'
        )
        LIMIT 1;`,
        [
            req.body.number,
            req.body.availability,
            req.body.type,
            req.body.hotel_id,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateRoom = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE rooms 
        SET 
        number = '${req.body.number}',
        availability = '${req.body.availability}',
        type = '${req.body.type}',
        hotel_id = '${req.body.hotel_id}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteRoom = (req, res) => {
    sqlCon.query(
        `DELETE FROM rooms WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllRooms,
    getRoomById,
    postRoom,
    updateRoom,
    deleteRoom
};

