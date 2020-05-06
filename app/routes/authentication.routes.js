module.exports = app => {
    const authentication_controller = require("../controllers/authentication.controller");
    const employee = require("../controllers/employee.controller.js");

    // API to log user in
    app.post("/login", authentication_controller.auth(), (req, res) => {
        res.status(200).send(req.user);
    });

    // API to log user out
    app.get('/logout', function (req, res) {
        // call req.logout to remove user from session
        req.logout();
        res.status(200).send();
    });

    // endpoint to create employee/user
    app.post("/signUp", employee.create);

};
