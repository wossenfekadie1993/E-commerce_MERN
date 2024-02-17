const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/users');

passport.use(new LocalStrategy(
    function(email, password, done) {
        UserModel.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); } //When some error occurs

            if (!user) { //When username is invalid
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!bcrypt.compareSync(password, user.password)) { //When password is invalid
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user); //When user is valid
        });
    }
));

// Persists user data inside session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Fetches session details using session id
passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        done(err, user);
    });
});
