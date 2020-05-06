const sql = require("./db.js");

// constructor
const Annual_leave = function (annual_leave) {
    this.employeeId = annual_leave.employeeId;
    this.date_from = annual_leave.date_from;
    this.date_to = annual_leave.date_to;
    this.approved = annual_leave.approved;
    this.type = annual_leave.type;
};

Annual_leave.create = (newAnnual_leave, result) => {
    sql.query("INSERT INTO annual_leave SET ?", newAnnual_leave, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created annual_leave: ", {id: res.insertId, ...newAnnual_leave});
        result(null, {id: res.insertId, ...newAnnual_leave});
    });
};

Annual_leave.findById = (employeeId, result) => {
    sql.query(`SELECT * FROM annual_leave WHERE employeeId = ${employeeId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found annual_leave: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Annual leave with the id
        result({kind: "not_found"}, null);
    });
};

Annual_leave.getAll = result => {
    sql.query("SELECT * FROM annual_leave", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("annual_leave: ", res);
        result(null, res);
    });
};

Annual_leave.updateById = (id, annual_leave, result) => {
    sql.query(
        "UPDATE annual_leave SET date_from = ?, date_to = ?, approved = ?, type = ? WHERE annual_leaveId = ?",
        [annual_leave.date_from, annual_leave.date_to, annual_leave.approved, annual_leave.type, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Annual leave with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated annual_leave: ", {id: id, ...annual_leave});
            result(null, {id: id, ...annual_leave});
        }
    );
};

Annual_leave.remove = (id, result) => {
    sql.query("DELETE FROM annual_leave WHERE annual_leaveId = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Annual leave with the id
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted annual_leave with id: ", id);
        result(null, res);
    });
};

Annual_leave.removeAll = result => {
    sql.query("DELETE FROM annual_leave", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} annual_leave`);
        result(null, res);
    });
};

module.exports = Annual_leave;
