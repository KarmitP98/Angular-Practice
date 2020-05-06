module.exports = app => {
    const employee = require("../controllers/employee.controller.js");

    // Create a new Employee
    app.post("/employees", employee.create);

    // Retrieve all Employees
    app.get("/employees", employee.findAll);

    // Retrieve a single Employee with employeeId
    app.get("/employees/:employeeId", employee.findOne);

    // Fetch all pending admin requests
    app.get("/pendingAdminRequests", employee.findAllPendingAdminRequests);

    // Update a Employee with employeeId
    app.put("/employees/:employeeId", employee.update);

    // Delete a Employee with employeeId
    app.delete("/employees/:employeeId", employee.delete);

    // Create a new Employee
    app.delete("/employees", employee.deleteAll);
};
