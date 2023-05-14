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


// function to add a department
function addDepartment(id, deptName) {
    db.query('INSERT INTO department (id, name) VALUES (?, ?)', [id, deptName], function (err, results) {
        console.table(results);
    });

    viewAllDepartments();
};
// addDepartment(8, 'Turner and Hooch');

// function to delete a department
function deleteDepartment(id) {
    db.query('DELETE FROM department WHERE id = ?', id, function (err, results) {
        console.table(results);
    });

    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
    });
}
// deleteDepartment(8);

// function to view all roles
function viewAllRoles() {
    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id',
     function (err, results) {
        console.table(results); 
    });
}
// viewAllRoles();

// function to add a role
function addRole(title, salary, deptId) {
    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, deptId], function (err, results) {
        if (err) {
            console.log('Error in the addRole Function: ', err);
            return;
        }
        console.log('Role successfully added!')
    });
    
    viewAllRoles();
}
// addRole('General Manager', 300000, 8);

// function to delete a role
function deleteRole(id) {
    db.query('DELETE FROM role WHERE id = ?', id, function (err, results) {
        if (err) {
            console.log('Error in the deleteRole Function: ', err);
            return;
        }
        console.log('Role successfully deleted!')
    });
    viewAllRoles();
}

deleteRole(11);

// function to view all employees
function viewAllEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id',
     function (err, results) {
        console.table(results); 
    });
}
// viewAllEmployees();