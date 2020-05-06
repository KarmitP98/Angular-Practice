const Timesheet = require("../models/timesheet.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Timesheet
    const timesheet = new Timesheet({
        employeeId: req.body.employeeId,
        task: req.body.task,
        name: req.body.name,
        date: req.body.date,
        time_logged: req.body.time_logged,
        approved: req.body.approved
    });

    // Save Timesheet in the database
    Timesheet.create(timesheet, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Timesheet."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Timesheet.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Timesheet."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Timesheet.findById(req.params.employeeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send([])
            } else {
                res.status(500).send({
                    message: "Error retrieving timesheet with employeeId " + req.params.employeeId
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

    Timesheet.updateById(
        req.params.timesheetId,
        new Timesheet(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found timesheet with timesheetId ${req.params.timesheetId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating timesheet with timesheetId " + req.params.timesheetId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Timesheet.remove(req.params.employeeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found timesheet with employeeId ${req.params.employeeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete timesheet with employeeId " + req.params.employeeId
                });
            }
        } else res.send({message: `timesheet was deleted successfully!`});
    });
};

exports.deleteAll = (req, res) => {
    Timesheet.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all employees."
            });
        else res.send({message: `All timesheets were deleted successfully!`});
    });
};
