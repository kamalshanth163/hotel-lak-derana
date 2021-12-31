const sqlCon = require("../db/connection");

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
    sqlCon.query(
        `INSERT INTO rooms (number, availability, type, hotel_id)
        SELECT ?,?,?,?
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
            req.body.hotel_id
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateRoom = (req, res) => {
    sqlCon.query(
        `UPDATE rooms 
        SET 
        number = '${req.body.number}',
        availability = '${req.body.availability}',
        type = '${req.body.type}',
        hotel_id = '${req.body.hotel_id}'
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

