const db = require("./connection");

class Seed {

    constructor() {
        this.createAllTables();
        this.insertAdmins();
    }

    insertAdmins() {
        var insertAdmin = 
        `INSERT INTO Employees (Name, Department, Role, Email, Phone, Password)
        SELECT "Owner", "Administration", "Admin", "admin@gmail.com", "0811234567", "admin123"
        FROM DUAL
        WHERE NOT EXISTS(
            SELECT 1
            FROM Employees
            WHERE Role = 'Admin'
        )
        LIMIT 1;`;

        db.query(insertAdmin, function(err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
    }

    createAllTables() {
        let createTables = 
        `
        CREATE TABLE if not exists Customers (
            Id INT NOT NULL AUTO_INCREMENT,
            Name VARCHAR(100) NOT NULL,
            Address VARCHAR(100),
            Phone VARCHAR(40),
            PRIMARY KEY (Id)
        );
        
        CREATE TABLE if not exists Hotels (
            Id INT NOT NULL AUTO_INCREMENT,
            Name VARCHAR(100) NOT NULL,
            Address VARCHAR(100),
            Phone VARCHAR(40),
            PRIMARY KEY (Id)
        );
        
        CREATE TABLE if not exists Rooms (
            Id INT NOT NULL AUTO_INCREMENT,
            Number VARCHAR(100) NOT NULL,
            Availability BOOLEAN,
            Type VARCHAR(40),
            HotelId INT,
            PRIMARY KEY (Id),
            FOREIGN KEY (HotelId) REFERENCES Hotels(Id)
        );
        
        CREATE TABLE if not exists Employees (
            Id INT NOT NULL AUTO_INCREMENT,
            Name VARCHAR(100),
            Department VARCHAR(100),
            Role VARCHAR(100),
            Email VARCHAR(100),
            Phone VARCHAR(100),
            Password VARCHAR(100),
            HotelId INT,
            PRIMARY KEY (Id),
            FOREIGN KEY (HotelId) REFERENCES Hotels(Id)
        );
        
        CREATE TABLE if not exists Salaries (
            Id INT NOT NULL AUTO_INCREMENT,
            BasicSalary DECIMAL(13,2),
            OverTime DECIMAL(13,2),
            Allowance DECIMAL(13,2),
            Leaves DECIMAL(13,2),
            Deduction DECIMAL(13,2),
            FinalAmount DECIMAL(13,2),
            HRId INT,
            EmployeeId INT,
            PRIMARY KEY (Id),
            FOREIGN KEY (EmployeeId) REFERENCES Employees(Id)
        );
        
        CREATE TABLE if not exists Attendances (
            Id INT NOT NULL AUTO_INCREMENT,
            Entered DATETIME,
            Exited DATETIME,
            HRId INT,
            EmployeeId INT,
            PRIMARY KEY (Id),
            FOREIGN KEY (EmployeeId) REFERENCES Employees(Id)
        );
        
        CREATE TABLE if not exists Payments (
            Id INT NOT NULL AUTO_INCREMENT,
            DateCheckedIn DATETIME,
            DateCheckedOut DATETIME,
            ReservationFee DECIMAL(13,2),
            HotelFee DECIMAL(13,2),
            Paid DECIMAL(13,2),
            Due DECIMAL(13,2),
            Completed BOOLEAN,
            CustomerId INT,
            RoomId INT,
            PRIMARY KEY (Id),
            FOREIGN KEY (CustomerId) REFERENCES Customers(Id),
            FOREIGN KEY (RoomId) REFERENCES Rooms(Id)
        );
        
        CREATE TABLE if not exists Reservations (
            Id INT NOT NULL AUTO_INCREMENT,
            AdultsCount INT,
            ChildrenCount INT,
            CustomerId INT,
            RoomId INT,
            PRIMARY KEY (Id),
            FOREIGN KEY (CustomerId) REFERENCES Customers(Id),
            FOREIGN KEY (RoomId) REFERENCES Rooms(Id)
        );
        
        CREATE TABLE if not exists Finances (
            Id INT NOT NULL AUTO_INCREMENT,
            Amount DECIMAL(13,2),
            FromWhom VARCHAR(100),
            Type VARCHAR(40),
            RecordedBy INT,
            PRIMARY KEY (Id),
            FOREIGN KEY (RecordedBy) REFERENCES Employees(Id)
        );
        `;

        db.query(createTables, function(err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });
    }
}

module.exports = Seed;