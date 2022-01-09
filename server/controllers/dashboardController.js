const sqlCon = require("../db/connection");

var data = {
    totalHotels: 0,
    totalRooms: 0,
    totalCustomers: 0,
    totalEmployees: 0,
    totalReservations: 0,
    totalIncome: 0,
    totalExpense: 0,
    employee_count: {
        admin: 0,
        hr: 0,
        reservationManager: 0,
        barManager: 0,
        manaager: 0
    }
}

const getData = (req, res) => {

    sqlCon.query("SELECT Count(*) FROM customers", (err, results) => {
        if(err) return res.sendStatus(400);
        const result = Object.values(JSON.parse(JSON.stringify(results)))
        var count = result[0]['Count(*)'];
        data.totalCustomers = count;
    })

    sqlCon.query("SELECT Count(*) FROM employees", (err, results) => {
        if(err) return res.sendStatus(400);
        const result = Object.values(JSON.parse(JSON.stringify(results)))
        var count = result[0]['Count(*)'];
        data.totalEmployees = count;
    })

    sqlCon.query("SELECT Count(*) FROM rooms", (err, results) => {
        if(err) return res.sendStatus(400);
        const result = Object.values(JSON.parse(JSON.stringify(results)))
        var count = result[0]['Count(*)'];
        data.totalRooms = count;
    })

    sqlCon.query("SELECT Count(*) FROM hotels", (err, results) => {
        if(err) return res.sendStatus(400);
        const result = Object.values(JSON.parse(JSON.stringify(results)))
        var count = result[0]['Count(*)'];
        data.totalHotels = count;
        console.log(data)
    })
    console.log(data)

};

module.exports = {
    getData,
};