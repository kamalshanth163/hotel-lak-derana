const sqlCon = require("../db/connection");

const getAllSalaries = (req, res) => {
    sqlCon.query("SELECT * FROM salaries", (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
};

const getSalaryById = (req, res) => {
    sqlCon.query(`SELECT * FROM salaries WHERE id = ${req.params.id}`, (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results);
    })
}

const postSalary = (req, res) => {
    sqlCon.query(
        `INSERT INTO salaries (basic_salary, over_time, allowance, leaves, deduction, final_amount, hr_id, employee_id)
        VALUES (?,?,?,?,?,?,?,?);`,
        [
            req.body.basic_salary,
            req.body.over_time,
            req.body.allowance,
            req.body.leaves,
            req.body.deduction,
            req.body.final_amount,
            req.body.hr_id,
            req.body.employee_id
        ]
    , (err, results) => {
        console.log(err)
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const updateSalary = (req, res) => {
    sqlCon.query(
        `UPDATE salaries 
        SET 
        basic_salary = '${req.body.basic_salary}',
        over_time = '${req.body.over_time}',
        allowance = '${req.body.allowance}',
        leaves = '${req.body.leaves}',
        deduction = '${req.body.deduction}',
        final_amount = '${req.body.final_amount}',
        hr_id = '${req.body.hr_id}',
        employee_id = '${req.body.employee_id}'
        WHERE id = '${req.body.id}';`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

const deleteSalary = (req, res) => {
    sqlCon.query(
        `DELETE FROM salaries WHERE id = ${req.params.id};`
    , (err, results) => {
        if(err) return res.sendStatus(400);
        return res.send(results); 
    })
}

module.exports = {
    getAllSalaries,
    getSalaryById,
    postSalary,
    updateSalary,
    deleteSalary
};

