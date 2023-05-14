const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_tracker_db'
    },
    console.log('Connected to the employee_tracker_db database.')
);
// functrion to view all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
    });
};

viewAllDepartments();

// function to view all roles
function viewAllRoles() {
    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id',
     function (err, results) {
        console.table(results); 
    });
}

viewAllRoles();

// function to view all employees
// this function allows you to view all employees, their roles, salaries, departments, and managers
function viewAllEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id',
     function (err, results) {
        console.table(results); 
    });
}

viewAllEmployees();
