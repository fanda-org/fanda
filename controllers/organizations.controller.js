const express = require('express');
const router = express.Router();
const auth = require('../_helpers/passport-auth');
const orgService = require('../services/organization.service');

// routes
router.get('/', auth.isAuthenticated, (req, res, next) => {
  // console.log('qry', req.query);
  orgService
    .getAll({ code: '{not}FANDA' }) // 'code={not}FANDA' // { code: { $ne: 'FANDA' } }
    .then(orgs => {
      // const result = res.json(orgs);
      // return result;
      res.render('organizations', {
        active: { organizations: true },
        currentUser: req.session.user,
        orgs: orgs,
        currentOrg: req.session.organization
      });
      // res.render('organizations', {
      //   active: { organizations: true },
      //   organizations: orgs
      // });
    })
    .catch(err => next(err));

  // res.render('organizations', {
  //   active: { organizations: true },
  //   user: req.session.user,
  //   org: req.session.organization
  // });
});

router.get('/list', auth.isAuthenticated, (req, res, next) => {
  // console.log('qry', req.query);
  orgService
    .getAll(req.query)
    .then(orgs => {
      const result = res.json(orgs);
      return result;
      // res.render('organizations', {
      //   active: { organizations: true },
      //   organizations: orgs
      // });
    })
    .catch(err => next(err));
});

router.get('/select/:id', auth.isAuthenticated, (req, res, next) => {
  orgService
    .getById(req.params.id)
    .then(org => {
      if (org) {
        req.session.organization = org;
        return res.redirect('/');
      } else {
        return res.sendStatus(404);
      }
    })
    .catch(err => next(err));
});

router.get('/:id', auth.isAuthenticated, getById);
router.post('/', auth.isAuthenticated, create);
router.put('/:id', auth.isAuthenticated, update);
router.delete('/:id', auth.isAuthenticated, _delete);

module.exports = router;

function getById(req, res, next) {
  orgService
    .getById(req.params.id)
    .then(org => (org ? res.json(org) : res.sendStatus(404)))
    .catch(err => next(err));
}

function create(req, res, next) {
  orgService
    .create(req.body)
    .then(org => res.json(org))
    .catch(err => next(err));
}

function update(req, res, next) {
  orgService
    .update(req.params.id, req.body)
    .then(org => res.json(org))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  orgService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
