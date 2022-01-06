const sqlCon = require("../db/connection");
const DateTimeService = require('../services/DateTimeService');

const getAllEmployees = (req, res) => {
    sqlCon.query("SELECT * FROM employees", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getEmployeeById = (req, res) => {
    sqlCon.query(`SELECT * FROM employees WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postEmployee = (req, res) => {
    console.log(req.body)
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    sqlCon.query(
        `INSERT INTO employees (name, department, role, email, phone, password, hotel_id, created_at, updated_at)
        SELECT ?,?,?,?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM employees
            WHERE email = '${req.body.email}' AND password = '${req.body.password}'
        )
        LIMIT 1;`,
        [
            req.body.name,
            req.body.department,
            req.body.role,
            req.body.email,
            req.body.phone,
            req.body.password,
            req.body.hotel_id,
            currentLocalTime,
            currentLocalTime,
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const loginEmployee = (req, res) => {
    sqlCon.query(
        `SELECT * FROM employees WHERE email = "${req.body.email}" AND password = "${req.body.password}"`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        if(results.length == 0) return res.sendStatus(404);
        return res.sendStatus(200);
    })
}

const updateEmployee = (req, res) => {
    console.log(req.body)
    var currentLocalTime = new DateTimeService().getLocalDateTime(new Date());
    var updatedAt = new Date(currentLocalTime).toISOString();
  
    sqlCon.query(
        `
        SET SQL_MODE='ALLOW_INVALID_DATES';
        UPDATE employees 
        SET 
        name = '${req.body.name}',
        department = '${req.body.department}',
        role = '${req.body.role}',
        email = '${req.body.email}',
        phone = '${req.body.phone}',
        password = '${req.body.password}',
        hotel_id = '${req.body.hotel_id}',
        updated_at = '${updatedAt}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteEmployee = (req, res) => {
    sqlCon.query(
        `DELETE FROM employees WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    postEmployee,
    loginEmployee,
    updateEmployee,
    deleteEmployee
};

