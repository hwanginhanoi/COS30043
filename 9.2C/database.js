const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'gnaoH3101!',
    database: 'units_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

const insertUnits = (units) => {
    const sql = `INSERT INTO units (code, description, cp, type) VALUES ?`;
    const values = units.map(unit => [unit.code, unit.desc, unit.cp, unit.type]);
    connection.query(sql, [values], (err) => {
        if (err) throw err;
        console.log('Units inserted!');
    });
};

module.exports = { connection, insertUnits };