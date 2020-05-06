module.exports = app => {
    const annual_leave = require("../controllers/annual_leave.controller.js");

    // Create a new annual leave
    app.post("/annual_leave", annual_leave.create);

    // Retrieve all annual leave
    app.get("/annual_leave", annual_leave.findAll);

    // Retrieve a single annual leave with employeeId
    app.get("/annual_leave/:leaveId", annual_leave.findOne);

    // Update a annual leave with employeeId
    app.put("/annual_leave/:leaveId", annual_leave.update);

    // Delete a annual leave with employeeId
    app.delete("/annual_leave/:leaveId", annual_leave.delete);

    // Create a new annual leave
    app.delete("/annual_leave", annual_leave.deleteAll);
};
