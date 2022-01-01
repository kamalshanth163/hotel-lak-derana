const sqlCon = require("../db/connection");

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
    sqlCon.query(
        `INSERT INTO attendances (entered, exited, hr_id, employee_id)
        VALUES (?,?,?,?);`,
        [
            new Date(req.body.entered),
            new Date(req.body.exited),
            req.body.hr_id,
            req.body.employee_id
        ]
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateAttendance = (req, res) => {
    sqlCon.query(
        `UPDATE attendances 
        SET 
        entered = '${req.body.entered}',
        exited = '${req.body.exited}',
        hr_id = '${req.body.hr_id}',
        employee_id = '${req.body.employee_id}'
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

