module.exports = app => {
    const timesheet = require("../controllers/timesheet.controller.js");

    // Create a new timesheet
    app.post("/timesheet", timesheet.create);

    // Retrieve all timesheets
    app.get("/timesheet", timesheet.findAll);

    // Retrieve a single timesheet with employeeId
    app.get("/timesheet/:employeeId", timesheet.findOne);

    // Update a timesheet with timesheetId
    app.put("/timesheet/:timesheetId", timesheet.update);

    // Delete a timesheet with employeeId
    app.delete("/timesheet/:employeeId", timesheet.delete);

    // Create a new timesheet
    app.delete("/timesheet", timesheet.deleteAll);
};
