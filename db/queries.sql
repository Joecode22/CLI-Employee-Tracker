--View All Departments ``````````````````````````````````````````````````````````````````````````````````
USE employee_tracker_db;
SELECT * FROM department;

--Add Deparment
--Insert a new department into the department table. 
USE employee_tracker_db;
INSERT INTO department (id, name)
VALUES (5, 'Marketing');

--View All Roles```````````````````````````````````````````````````````````````````````````````````````````
--Join the roles table andn the departments table to see the department name for each role.
USE employee_tracker_db;
SELECT role.id, role.title, role.salary, department.name AS department 
FROM role
JOIN department ON
role.department_id = department.id;

--Add Role
--Insert a new role into the role table.
USE employee_tracker_db;
INSERT INTO role (id, title, salary, department_id)
VALUES (9, 'Marketing Lead', 100000.00, 5);

--View All Employees`````````````````````````````````````````````````````````````````````````````````````````````
--Join the employees table and the roles table to see the employee data and their role information.
USE employee_tracker_db;
--here we select the columns we want to see from the employee table and the role table. We also use the AS keyword to rename the manager column to manager and we use the CONCAT function to combine the first_name and last_name columns from the manager table.
SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
--This joins the employee table to the role table using the role_id column.
JOIN role ON
employee.role_id = role.id
--This joins the role table to the department table using the department_id column.
JOIN department ON
role.department_id = department.id
LEFT JOIN employee manager ON
manager.id = employee.manager_id;

--Add Employee
--Insert a new employee into the employee table.
USE employee_tracker_db;
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, 'Jane', 'Doe', 1, NULL);

--Update Employee Role
--Update an employee's role in the employee table.
USE employee_tracker_db;
UPDATE employee
SET role_id = 2
WHERE id = 9;




