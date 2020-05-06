const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./app/config/server.config");
const authentication_controller = require("./app/controllers/authentication.controller");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// initalize express session middleware to store user in session
app.use(session({secret: config.sessionSecret}));

// initialize passport LocalStrategy
authentication_controller.initializeStrategy();

// initialize passport
app.use(passport.initialize());

// initialize passport session
app.use(passport.session());

// used to check if particular API endpoint can be accessed without login or not
// only routes in whiteList array are unsecured
const isWhiteListed = (path, whiteList = ['login', 'signUp']) => {
    let whiteListed = false;
    for (let i = 0; i < whiteList.length; i++) {
        // this won't check authentication for login
        // add logic here if you want to check POST or GET method in login
        if (path.indexOf(whiteList[i]) !== -1) {
            whiteListed = true;
        }
    }
    return whiteListed;
};

// protect all the endpoints
const authenticationMiddleware = (req, res, next) => {
    if (isWhiteListed(req.originalUrl) || req.isAuthenticated()) {
        return next();
    }

    res.status(401).send();
};
// register above function as middleware
app.use(authenticationMiddleware);

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to ffmc application."});
});
require("./app/routes/employee.routes.js")(app);
require("./app/routes/timesheet.routes.js")(app);
require("./app/routes/annual_leave.routes.js")(app);
require("./app/routes/authentication.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
