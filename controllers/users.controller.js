const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../_helpers/passport-auth');
const userService = require('../services/user.service');
const toastr = require('../_helpers/toastr-type');

/** ROUTES */
router.get('/login', (req, res) => {
  return res.render('users/login', { model: req.model, emptyLayout: true });
});

router.post('/login', (req, res, next) => {
  const model = req.body;
  //req.model = model;
  passport.authenticate('local', (err, user, info) => {
    if (info) {
      return res.render('users/login', {
        model: model,
        emptyLayout: true,
        message: { type: 'warning', text: info.message }
      }); //next();
    }
    if (err) {
      //req.message = err;
      return res.render('users/login', {
        model: model,
        emptyLayout: true,
        message: { type: toastr.WARNING, text: err }
      }); //next(err);
    }
    if (!user) {
      return res.render('users/login', {
        model: model,
        emptyLayout: true,
        message: { type: 'warning', text: 'User does not exists' }
      }); //next();
    }
    req.login(user, err => {
      if (err) {
        return res.render('users/login', {
          model: model,
          emptyLayout: true,
          message: { type: toastr.WARNING, text: err }
        }); //next(err);
      }
      req.session.user = user;
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/register', (req, res) => {
  return res.render('users/register', { emptyLayout: true });
});

router.post('/register', (req, res) => {
  const model = req.body;
  userService
    .create(model)
    .then(() => {
      return res.redirect('/users/login');
    })
    .catch(err => {
      // req.model = model;
      // req.message = err;
      return res.render('users/register', {
        model: model,
        emptyLayout: true,
        message: { type: toastr.WARNING, text: err }
      }); //next();
    });
});

router.get('/logout', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  req.session.destroy(function(err) {
    return res.redirect('/'); //Inside a callback… bulletproof!
  });
});

router.get('/forgot-password', (req, res) => {
  return res.render('users/forgot-password', { emptyLayout: true });
});

router.get('/profile', auth.isAuthenticated, (req, res) => {
  return res.render('users/profile', {
    active: { profile: true },
    currentUser: req.session.user,
    currentOrg: req.session.organization
  });
});

router.get('/', auth.isAuthenticated, (req, res, next) => {
  userService
    .getAll(req.query)
    .then(users => {
      res.render('users', { active: { users: true }, users: users, currentOrg: req.session.organization });
    })
    .catch(err => next(err));
});
router.get('/current', auth.isAuthenticated, getCurrent);
router.get('/:id', auth.isAuthenticated, getById);
router.put('/:id', auth.isAuthenticated, update);
router.delete('/:id', auth.isAuthenticated, _delete);

module.exports = router;

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
