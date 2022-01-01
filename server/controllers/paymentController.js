const sqlCon = require("../db/connection");

const getAllPayments = (req, res) => {
    sqlCon.query("SELECT * FROM payments", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getPaymentById = (req, res) => {
    sqlCon.query(`SELECT * FROM payments WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postPayment = (req, res) => {
    sqlCon.query(
        `INSERT INTO payments (date_checked_in, date_checked_out, reservation_fee, hotel_fee, paid, due, completed, customer_id, room_id)
        VALUES (?,?,?,?,?,?,?,?,?);`,
        [
            new Date(req.body.date_checked_in),
            new Date(req.body.date_checked_out),
            req.body.reservation_fee,
            req.body.hotel_fee,
            req.body.paid,
            req.body.due,
            req.body.completed,
            req.body.customer_id,
            req.body.room_id
        ]
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updatePayment = (req, res) => {
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE payments
        SET 
        date_checked_in = '${req.body.date_checked_in}',
        date_checked_out = '${req.body.date_checked_out}',
        reservation_fee = '${req.body.reservation_fee}',
        hotel_fee = '${req.body.hotel_fee}',
        paid = '${req.body.paid}',
        due = '${req.body.due}',
        completed = '${req.body.completed}',
        customer_id = '${req.body.customer_id}',
        room_id = '${req.body.room_id}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deletePayment = (req, res) => {
    sqlCon.query(
        `DELETE FROM payments WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllPayments,
    getPaymentById,
    postPayment,
    updatePayment,
    deletePayment
};

