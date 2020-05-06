const Annual_leave = require("../models/annual_leave.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create Annual leave
    const annual_leave = new Annual_leave({
        employeeId: req.body.employeeId,
        date_from: req.body.date_from,
        date_to: req.body.date_to,
        approved: req.body.approved,
        type: req.body.type
    });

    // Save Annual leave in the database
    Annual_leave.create(annual_leave, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the annual_leave."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Annual_leave.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving annual_leave."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Annual_leave.findById(req.params.leaveId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found annual_leave with leaveId ${req.params.leaveId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving annual_leave with leaveId " + req.params.leaveId
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

    Annual_leave.updateById(
        req.params.leaveId,
        new Annual_leave(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found annual_leave with leaveId ${req.params.leaveId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating annual_leave with leaveId " + req.params.leaveId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Annual_leave.remove(req.params.leaveId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found annual_leave with leaveId ${req.params.leaveId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete annual_leave with leaveId " + req.params.leaveId
                });
            }
        } else res.send({message: `annual_leave was deleted successfully!`});
    });
};

exports.deleteAll = (req, res) => {
    Annual_leave.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all annual_leave."
            });
        else res.send({message: `All annual_leave were deleted successfully!`});
    });
};
