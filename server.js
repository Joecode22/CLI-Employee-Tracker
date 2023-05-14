const express = require('express');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker_db'
  });
//set the port to 3001 or whatever is in the .env file
//This is useful when deploying to Heroku
const PORT = process.env.PORT || 3001;

const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//get route for all departments
app.get('/api/departments', (req, res) => {
  if (err) {
    res.status(500).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: rows
  });
});