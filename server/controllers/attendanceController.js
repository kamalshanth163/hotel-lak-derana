const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllAttendances = (req, res) => {
    sqlCon.query("SELECT * FROM attendances", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getAttendanceById = (req, res) => {
    sqlCon.query(`SELECT * FROM attendances WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postAttendance = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO attendances (entered, exited, hr_id, employee_id, created_at, updated_at)
        VALUES (?,?,?,?,?,?);`,
        [
            new Date(req.body.entered),
            new Date(req.body.exited),
            req.body.hr_id,
            req.body.employee_id,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateAttendance = (req, res) => {
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE attendances 
        SET 
        entered = '${req.body.entered}',
        exited = '${req.body.exited}',
        hr_id = '${req.body.hr_id}',
        employee_id = '${req.body.employee_id}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteAttendance = (req, res) => {
    sqlCon.query(
        `DELETE FROM attendances WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllAttendances,
    getAttendanceById,
    postAttendance,
    updateAttendance,
    deleteAttendance
};

