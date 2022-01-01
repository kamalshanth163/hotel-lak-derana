const sqlCon = require("./connection");

class Seed {

    constructor() {
        this.createAllTables();
        this.insertAdmins();
    }

    insertAdmins() {
        var insertAdmin = 
        `INSERT INTO employees (name, department, role, email, phone, password)
        SELECT "Owner", "Administration", "Admin", "admin@gmail.com", "0811234567", "admin123"
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM employees
            WHERE role = 'Admin'
        )
        LIMIT 1;`;

        sqlCon.query(insertAdmin, function(err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
    }

    createAllTables() {
        let createTables = 
        `
        CREATE TABLE if not exists customers (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(100),
            phone VARCHAR(40),
            PRIMARY KEY (id)
        );
        
        CREATE TABLE if not exists hotels (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(100),
            phone VARCHAR(40),
            PRIMARY KEY (id)
        );
        
        CREATE TABLE if not exists rooms (
            id INT NOT NULL AUTO_INCREMENT,
            number VARCHAR(100) NOT NULL,
            availability BOOLEAN,
            type VARCHAR(40),
            hotel_id INT,
            PRIMARY KEY (id),
            FOREIGN KEY (hotel_id) REFERENCES hotels(id)
        );
        
        CREATE TABLE if not exists employees (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100),
            department VARCHAR(100),
            role VARCHAR(100),
            email VARCHAR(100),
            phone VARCHAR(100),
            password VARCHAR(100),
            hotel_id INT,
            PRIMARY KEY (id),
            FOREIGN KEY (hotel_id) REFERENCES hotels(id)
        );
        
        CREATE TABLE if not exists salaries (
            id INT NOT NULL AUTO_INCREMENT,
            basic_salary DECIMAL(13,2),
            over_time DECIMAL(13,2),
            allowance DECIMAL(13,2),
            leaves DECIMAL(13,2),
            deduction DECIMAL(13,2),
            final_amount DECIMAL(13,2),
            hr_id INT,
            employee_id INT,
            PRIMARY KEY (id),
            FOREIGN KEY (employee_id) REFERENCES employees(id)
        );
        
        CREATE TABLE if not exists attendances (
            id INT NOT NULL AUTO_INCREMENT,
            entered DATETIME,
            exited DATETIME,
            hr_id INT,
            employee_id INT,
            PRIMARY KEY (id),
            FOREIGN KEY (employee_id) REFERENCES employees(id)
        );
        
        CREATE TABLE if not exists payments (
            id INT NOT NULL AUTO_INCREMENT,
            date_checked_in DATETIME,
            date_checked_out DATETIME,
            reservation_fee DECIMAL(13,2),
            hotel_fee DECIMAL(13,2),
            paid DECIMAL(13,2),
            due DECIMAL(13,2),
            completed BOOLEAN,
            customer_id INT,
            room_id INT,
            PRIMARY KEY (id),
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        );
        
        CREATE TABLE if not exists reservations (
            id INT NOT NULL AUTO_INCREMENT,
            adults_count INT,
            children_count INT,
            customer_id INT,
            room_id INT,
            PRIMARY KEY (id),
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        );
        
        CREATE TABLE if not exists finances (
            id INT NOT NULL AUTO_INCREMENT,
            amount DECIMAL(13,2),
            payer VARCHAR(100),
            description VARCHAR(40),
            recorded_by INT,
            PRIMARY KEY (id),
            FOREIGN KEY (recorded_by) REFERENCES employees(id)
        );
        `;

        sqlCon.query(createTables, function(err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
    }
}

module.exports = Seed;