var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user");
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        process.nextTick(async function () {
          try {
            const user = await User.findOne({ email: email });
            if (user) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken.")
              );
            } else {
              var newUser = new User(req.body);
              newUser.password = newUser.generateHash(password);
              console.log(newUser);
              newUser.save(function (err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          } catch (err) {
            res.status(500).send("Some error in the database");
          }
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      function (req, email, password, done) {
        // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        User.findOne({ email: email }, function (err, user) {
          console.log("Hello");
          // if there are any errors, return the error before anything else
          if (err) return done(err);
          // if no user is found, return the message
          if (!user) {
            return done(
              null,
              false,
              req.flash("loginMessage", "No user found.")
            ); // req.flash is the way to set flashdata using connect-flash
          } // if the user is found but the password is wrong
          if (!user.validPassword(password)) {
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")
            ); // create the loginMessage and save it to session as flashdata
          }
          return done(null, user);
        });
      }
    )
  );
};
