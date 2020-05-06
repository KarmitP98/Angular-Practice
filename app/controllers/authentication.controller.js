const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee.model');

// this method will initialize strategy, serializer and deserializer for passport js
exports.initializeStrategy = () => {
    // adding LocalStrategy middleware, which will get invoked at the time of login and validate the credentials
    passport.use(new LocalStrategy(
        {
            usernameField: 'email', // default is 'username', we expect to receive 'email' from front end
            passwordField: 'password'
        },
        function (email, password, done) {
            // find the employee by given email
            Employee.findByProperty('email', email, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    // call the callback with error if user not found
                    return done(null, false, {message: 'Incorrect email.'});
                }
                // if found, validate the password
                user.validatePassword(password, (res) => {
                    if (res) {
                        // password validation is successful
                        return done(null, user);
                    }
                    // password validation is unsuccessful
                    return done(null, false, {message: 'Incorrect password.'});
                });
            });
        }
    ));

    // serializer so that user can be stored in session
    passport.serializeUser(function (user, done) {
        done(null, user.employeeId);
    });

    // deserializer so that user can be retrieved from session
    passport.deserializeUser(function (id, done) {
        Employee.findByProperty('employeeId', id, function (err, user) {
            done(err, user);
        });
    });
};

// Middleware to be used for login
exports.auth = () => {
    return (req, res, next) => {
        // invoker the LocalStrategy declared above
        passport.authenticate('local', (error, user, info = {}) => {
            // if error, send 400 code with error message
            if (error) return res.status(400).json({"message": error});

            // if email or password is incorrect, send 401 Unauthorized
            if (!user) {
                return res.status(401).json({"message": info.message});
            }

            // if everything is correct, call req.login to create session with user
            req.login(user, function (error) {
                if (error) return next(error);
                next();
            });
        })(req, res, next);
    }
};
