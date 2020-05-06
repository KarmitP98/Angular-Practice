const Employee = require("../models/employee.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // check if this is the first entry in DB,
    // if yes, make this user admin
    // get all the employees
    Employee.getAll((err, data) => {
        // if length is 0, this is first entry
        // set admin to approved
        if (data.length === 0) {
            req.body.admin = 'approved';
        }
        // Create a Employee
        const employee = new Employee({
            title: req.body.title,
            name: req.body.name,
            admin: req.body.admin,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob
        });

        // Save Employee in the database
        Employee.create(employee, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Employee."
                });
            else {
                res.send(data);
            }
        });
    });
};

exports.findAll = (req, res) => {
    Employee.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employees."
            });
        else res.send(data);
    });
};

// find all entries with admin as 'pending'
exports.findAllPendingAdminRequests = (req, res) => {
    Employee.getAllPendingAdminRequests((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employees."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Employee.findByProperty('employeeId', req.params.employeeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with employeeId ${req.params.employeeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Employee with employeeId " + req.params.employeeId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Employee.updateById(
        req.params.employeeId,
        new Employee(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Employee with employeeId ${req.params.employeeId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Employee with employeeId " + req.params.employeeId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Employee.remove(req.params.employeeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Employee with employeeId ${req.params.employeeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Employee with employeeId " + req.params.employeeId
                });
            }
        } else res.send({message: `Employee was deleted successfully!`});
    });
};

exports.deleteAll = (req, res) => {
    Employee.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all employees."
            });
        else res.send({message: `All Employees were deleted successfully!`});
    });
};
