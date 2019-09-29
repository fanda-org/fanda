const express = require('express');
const router = express.Router();
const auth = require('../_helpers/passport-auth');
const orgService = require('../services/organization.service');

const defaultQuery = { code: '{not}FANDA', active: 'true', sort_by: 'code' };

// routes
// INDEX
router.get('/', auth.isAuthenticated, (req, res) => {
  // console.log('req.query', req.query);

  // eslint-disable-next-line no-unused-vars
  // var { active, ...qry } = defaultQuery;
  // if (req.query.open == 'true') {
  //   qry = defaultQuery;
  // }

  // orgService
  //   .getAll(qry)
  //   .then(orgs => {
  //     // const result = res.json(orgs);
  //     // return result;
  //     // console.log(orgs.length, req.query.open);
  //     if (orgs.length == 1 && req.query.open == 'true') {
  //       res.redirect('organizations/select/' + orgs[0]._id);
  //     } else {
  res.render('organizations', {
    active: { organizations: true },
    currentUser: req.session.user,
    query: req.query.open,
    //orgs: orgs,
    currentOrg: req.session.organization
  });
  //   }
  //   // res.render('organizations', {
  //   //   active: { organizations: true },
  //   //   organizations: orgs
  //   // });
  // })
  // .catch(err => next(err));

  // res.render('organizations', {
  //   active: { organizations: true },
  //   user: req.session.user,
  //   org: req.session.organization
  // });
});

// INDEX - AJAX
router.get('/list', auth.isAuthenticated, (req, res, next) => {
  // console.log('req.query', req.query);

  // eslint-disable-next-line no-unused-vars
  var { active, ...qry } = defaultQuery;
  if (req.query.open == 'true') {
    qry = defaultQuery;
  }
  var combinedQry = { ...req.query, ...qry };

  // console.log('queries', qry, combinedQry, req.query.open);
  orgService
    .getAll(combinedQry)
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

// GET SELECT BY ID - OPEN ORGANIZATION
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

//GET - ADD/EDIT
router.get('/:id', auth.isAuthenticated, (req, res, next) => {
  orgService
    .getById(req.params.id)
    .then(org => {
      res.render('organizations/edit', {
        active: { organizations: true },
        currentUser: req.session.user,
        org: org,
        currentOrg: req.session.organization
      });
    })
    .catch(err => next(err));
});

// POST - CREATE
router.post('/', auth.isAuthenticated, (req, res, next) => {
  orgService
    .create(req.body)
    .then(org => res.json(org))
    .catch(err => next(err));
});

// PUT - UPDATE
router.put('/:id', auth.isAuthenticated, (req, res, next) => {
  orgService
    .update(req.params.id, req.body)
    .then(org => res.json(org))
    .catch(err => next(err));
});

// DELETE - REMOVE
router.delete('/:id', auth.isAuthenticated, (req, res, next) => {
  orgService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
});

module.exports = router;
