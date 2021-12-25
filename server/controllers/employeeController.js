const sqlCon = require("../db/connection");

const getAllEmployees = (req, res) => {
    sqlCon.query("SELECT * FROM Employees", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getEmployeeById = (req, res) => {
    sqlCon.query(`SELECT * FROM Employees WHERE Id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postEmployee = (req, res) => {
    sqlCon.query(
        `
        INSERT INTO Employees (Name, Department, Role, Email, Phone, Password)
        SELECT ?,?,?,?,?,?
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM Employees
            WHERE Email = '${req.body.email}' AND Password = '${req.body.password}'
        )
        LIMIT 1;`,
        [
            req.body.name,
            req.body.department,
            req.body.role,
            req.body.email,
            req.body.phone,
            req.body.password
        ]
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const loginEmployee = (req, res) => {
    sqlCon.query(`SELECT * FROM Employees WHERE Email = "${req.body.email}" AND Password = "${req.body.password}"`, (err, results) => {
        if(err) return res.sendStatus(400);
        if(results.length == 0) return res.sendStatus(404);
        return res.sendStatus(200);
    })
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    postEmployee,
    loginEmployee
};

