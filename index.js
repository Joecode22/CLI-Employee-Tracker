//NOTE: I used the following resources to help me with this assignment:
//Instructional video that covered the employee tracker assignment (week 5 day 5)
//Stack overflow question 66626936 (https://stackoverflow.com/questions/66626936/how-to-get-the-id-from-a-mysql-table)
//Inquirer documentation (https://www.npmjs.com/package/inquirer)
//MySQL documentation (https://www.npmjs.com/package/mysql2)

// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');

//helper functions
//reference instructor video and stack overflow question 66626936

//This function gets an employee id from the employee name
const getEmployeeId = async(employeeName) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?', [employeeName], function (err, results) {
            if (err) {
                return reject(err);
            }
            resolve(results[0].id);
        });
    });
}

//This function gets a list of employees
const getEmployees = async() => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, first_name, last_name FROM employee', function (err, results) {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}


//this function gets the managers
const getManagers = async() => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL', function (err, results) {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

//this function get the roles
const getRoles = async() => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, title FROM role', function (err, results) {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

//this function gets the departments
const getDepartments = async() => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, name FROM department', function (err, results) {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

//this function gets the department id from the department name
const getDepartmentId = async(deptName) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM department WHERE name = ?', [deptName], function (err, results) {
            if (err) {
                return reject(err);
            }
            resolve(results[0].id);
        });
    });
}

//this function gets the role id from the role title
const getRoleId = async(roleTitle) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM role WHERE title = ?', [roleTitle], function (err, results) {
            if (err) {
                return reject(err);
            }
            resolve(results[0].id);
        });
    });
}

//this function gets the manager id from the manager name
const getManagerId = async(managerName) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?', [managerName], function (err, results) {
            if (err) {
                return reject(err);
            }
            resolve(results[0].id);
        });
    });
}

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

// function to view all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log('Error in the viewAllDepartments Function: ', err);
            return;
        }
        console.table(results);
    });
};
// viewAllDepartments();

// function to add a department
function addDepartment(deptName) {
    db.query('INSERT INTO department (name) VALUES (?)', [deptName], function (err, results) {
        if (err) {
            console.log('Error in the addDepartment Function: ', err);
            return;
        }
        console.table(results);
    });

    viewAllDepartments();
};
// addDepartment(8, 'Turner and Hooch');

// function to view all roles
function viewAllRoles() {
    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id',
        function (err, results) {
            if (err) {
                console.log('Error in the viewAllRoles Function: ', err);
                return;
            }
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

// function to view all employees
function viewAllEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id',
        function (err, results) {
            if (err) {
                console.log('Error in the viewAllEmployees Function: ', err);
                return;
            }
            console.table(results);
        });
}
// viewAllEmployees();

// function to add an employee
function addEmployee(firstName, lastName, roleId, managerId) {
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId], function (err, results) {
        if (err) {
            console.log('Error in the addEmployee Function: ', err);
            return;
        }
        console.log('Employee successfully added!')
    });

    viewAllEmployees();
}
// addEmployee('Tom', 'Hanks', 5, 1);

// This function was discovered on Stack Overflow and clears the console
// https://stackoverflow.com/questons/8813142/clear-terminal-using-node-js-readline-stdout
const readline = require('readline');

function clearConsole() {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
}

//This function updates the employee role
function updateEmployeeRole(employeeId, roleId) {
    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId], function (err, results) {
        if (err) {
            console.log('Error in the updateEmployeeRole Function: ', err);
            return;
        }
        console.log('Employee role successfully updated!')
    });

    viewAllEmployees();
}

// this function prompts the user for what they want to do
const promptUser = async() => {
    const departments = await getDepartments();
    const departmentChoices = departments.map(dept => dept.name);
    const roles = await getRoles();
    const roleChoices = roles.map(role => role.title);
    const managers = await getManagers();
    const employees = await getEmployees();
    const employeeChoices = employees.map(employee => `${employee.first_name} ${employee.last_name}`);

    //This code was constructed by referencing Stack Overflow and allows the user to select 'No Manager' if they want
    const managerChoices = managers.map(manager => manager.first_name && manager.last_name ? `${manager.first_name} ${manager.last_name}` : 'No Manager');

     inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'Add a Department',
                'View All Roles',
                'Add a Role',
                'View All Employees',
                'Add an Employee',
                'update an employee role',
                'Exit']
        }
    ]).then(async function (response) {
        switch (response.action) {
            case 'View All Departments':
                clearConsole();
                viewAllDepartments();
                promptUser();
                break;
            case 'Add a Department':
                clearConsole();
                const addDeptPromptResult = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'What is the name of the department you would like to add?'
                    }
                ]);
                addDepartment(addDeptPromptResult.name);
                promptUser();
                break;
            case 'View All Roles':
                clearConsole();
                viewAllRoles();
                promptUser(); 
                break;
            case 'Add a Role':
                clearConsole();
                const rolePromptResult = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the title of the role you would like to add?'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role you would like to add?'
                    },
                    {
                        type: 'list',
                        name: 'deptId',
                        message: 'What is the department of the role you would like to add?',
                        choices: departmentChoices
                    }
                ]);
                const newDeptId = await getDepartmentId(rolePromptResult.deptId);
                addRole(rolePromptResult.title, rolePromptResult.salary, newDeptId);
                promptUser();
                break;
            case 'View All Employees':
                clearConsole();
                viewAllEmployees();
                promptUser();
                break;
            case 'Add an Employee':
                clearConsole();
                const employeePromptResult = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the first name of the employee?'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the last name of the employee?'
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the role of the employee?',
                        choices: roleChoices
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the manager of the employee?',
                        choices: managerChoices
                    }
                ])
                    const role_id = await getRoleId(employeePromptResult.role);
                    const manager_id = await getManagerId(employeePromptResult.manager);
                    addEmployee(employeePromptResult.firstName, employeePromptResult.lastName, role_id, manager_id);
                    promptUser();
                    break;

            case 'update an employee role':
                clearConsole();
                const updateEmployeePromptResult = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee would you like to update?',
                        choices: employeeChoices
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the new role of the employee?',
                        choices: roleChoices
                    }
                ])
                const update_employee_id = await getEmployeeId(updateEmployeePromptResult.employee);
                const update_new_role_id = await getRoleId(updateEmployeePromptResult.role);
                updateEmployeeRole(update_employee_id, update_new_role_id);
                promptUser();
                break;
        
            case 'Exit':
                clearConsole();
                console.log('Laters!');
                db.end();
                break;
            default:
                console.log('Please select an option');
                promptUser();
                break;
        }});
    }

promptUser();