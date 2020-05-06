const sql = require("./db.js");

// constructor
const Timesheet = function (timesheet) {
    this.employeeId = timesheet.employeeId;
    this.task = timesheet.task;
    this.name = timesheet.name;
    this.date = timesheet.date;
    this.time_logged = timesheet.time_logged;
    this.approved = timesheet.approved;
};

Timesheet.create = (newTimesheet, result) => {
    sql.query("INSERT INTO timesheet SET ?", newTimesheet, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created timesheet: ", {employeeId: res.insertId, ...newTimesheet});
        result(null, {id: res.insertId, ...newTimesheet});
    });
};

Timesheet.findById = (employeeId, result) => {
    sql.query(`SELECT * FROM timesheet WHERE employeeId = ${employeeId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            // console.log("found timesheet: ", res[0]);
            result(null, res);
            return;
        }

        // not found Timesheet with the id
        result({kind: "not_found"}, null);
    });
};

Timesheet.getAll = result => {
    sql.query("SELECT * FROM timesheet", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("timesheet: ", res);
        result(null, res);
    });
};

Timesheet.updateById = (id, timesheet, result) => {
    sql.query(
        "UPDATE timesheet SET task = ?, name = ?, date = ?, time_logged = ?, approved = ? WHERE timesheetId = ?",
        [timesheet.task, timesheet.name, timesheet.date, timesheet.time_logged, timesheet.approved, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Timesheet with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated timesheet: ", {id: id, ...timesheet});
            result(null, {id: id, ...timesheet});
        }
    );
};

Timesheet.remove = (id, result) => {
    sql.query("DELETE FROM timesheet WHERE employeeId = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Timesheet with the id
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted timesheet with id: ", id);
        result(null, res);
    });
};

Timesheet.removeAll = result => {
    sql.query("DELETE FROM timesheet", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} timesheet`);
        result(null, res);
    });
};

module.exports = Timesheet;
