const sql = require("./db.js");

// constructor
const Employee = function (employee) {
    this.title = employee.title;
    this.name = employee.name;
    this.admin = employee.admin;
    this.email = employee.email;
    this.password = employee.password;
    this.dob = employee.dob;
    this.employeeId = employee.employeeId;

    this.validatePassword = validatePassword.bind(this);
};

Employee.create = (newEmployee, result) => {
    sql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created employee: ", {id: res.insertId, ...newEmployee});
        result(null, {id: res.insertId, ...newEmployee});
    });
};

Employee.findByProperty = (property, value, result) => {
    sql.query(`SELECT * FROM employees WHERE  ${property} = '${value}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            const emp = new Employee(res[0]);
            console.log("found employee: ", emp);
            result(null, emp);
            return;
        }

        // not found Employee with the id
        result({kind: "not_found"}, null);
    });
};

Employee.getAll = result => {
    sql.query("SELECT * FROM employees", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("employees: ", res);
        result(null, res);
    });
};

// execute query to get all employees with admin status pending
Employee.getAllPendingAdminRequests = result => {
    sql.query('SELECT * FROM employees where admin = "pending" ', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("employees: ", res);
        result(null, res);
    });
};

Employee.updateById = (id, employee, result) => {
    sql.query(
        "UPDATE employees SET title = ?, name = ?, email = ?, password = ? , dob = ?, admin = ? WHERE employeeId = ?",
        [employee.title, employee.name, employee.email, employee.password, employee.dob, employee.admin, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Employee with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated employee: ", {id: id, ...employee});
            result(null, {id: id, ...employee});
        }
    );
};

Employee.remove = (id, result) => {
    sql.query("DELETE FROM employees WHERE employeeId = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Employee with the id
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted employee with id: ", id);
        result(null, res);
    });
};

Employee.removeAll = result => {
    sql.query("DELETE FROM employees", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} employees`);
        result(null, res);
    });
};

// this method just compares password as plain text
const validatePassword = function (password, result) {
    // we can add encrypt/decrypt logic here if required
    if (this.password === password) {
        result(true);
    } else {
        result(false);
    }
};

module.exports = Employee;
