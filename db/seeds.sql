USE employee_tracker_db;
INSERT INTO department (id, name)
VALUES
    (2, 'Engineering'),
    (3, 'Finance'),
    (4, 'Legal'),
    (1, 'Sales');
INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'Sales Lead', 100000.00, 1),
    (2, 'Salesperson', 80000.00, 1),
    (3, 'Lead Engineer', 150000.00, 2),
    (4, 'Software Engineer', 120000.00, 2),
    (5, 'Accountant', 125000.00, 3),
    (6, 'Legal Team Lead', 250000.00, 4),
    (7, 'Lawyer', 190000.00, 4);