const sqlCon = require("../db/connection");

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
    sqlCon.query(
        `INSERT INTO reservations (adults_count, children_count, customer_id, room_id)
        SELECT ?,?,?,?
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
            req.body.room_id
        ]
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateReservation = (req, res) => {
    sqlCon.query(
        `UPDATE reservations 
        SET 
        adults_count = '${req.body.adults_count}',
        children_count = '${req.body.children_count}',
        customer_id = '${req.body.customer_id}',
        room_id = '${req.body.room_id}'
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

