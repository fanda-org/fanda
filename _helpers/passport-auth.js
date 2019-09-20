require('rootpath')();
const userService = require('services/user.service');

function authenticate(userName, password, done) {
  // console.log(userName, password, done);
  userService
    .authenticate({ userName: userName, password: password })
    .then(user => {
      // console.log('User from database:', user);
      if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, user);
    })
    .catch(err => done(err));
}

function serializeUser(user, done) {
  done(null, user._id);
}

function deserializeUser(id, done) {
  userService
    .getById(id)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => done(err, false));
}

function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.isAuthenticated()) return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/users/login');
}

module.exports = { authenticate, serializeUser, deserializeUser, isAuthenticated };
