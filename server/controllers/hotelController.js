const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllHotels = (req, res) => {
    sqlCon.query("SELECT * FROM hotels", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getHotelById = (req, res) => {
    sqlCon.query(`SELECT * FROM hotels WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postHotel = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO hotels (name, address, phone, created_at, updated_at)
        SELECT ?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM hotels
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

const updateHotel = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE hotels 
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

const deleteHotel = (req, res) => {
    sqlCon.query(
        `DELETE FROM hotels WHERE id = ${req.params.id};`
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllHotels,
    getHotelById,
    postHotel,
    updateHotel,
    deleteHotel
};

