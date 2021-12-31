const sqlCon = require("../db/connection");

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
    sqlCon.query(
        `INSERT INTO hotels (name, address, phone)
        SELECT ?,?,?
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
            req.body.phone
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateHotel = (req, res) => {
    sqlCon.query(
        `UPDATE hotels 
        SET 
        name = '${req.body.name}',
        address = '${req.body.address}',
        phone = '${req.body.phone}'
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

