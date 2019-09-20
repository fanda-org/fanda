const express = require('express');
const router = express.Router();
const auth = require('../_helpers/passport-auth');
const bankService = require('../services/bank.service');

// routes
router.get('/', auth.isAuthenticated, getAll);
router.get('/:id', auth.isAuthenticated, getById);
router.post('/', auth.isAuthenticated, create);
router.put('/:id', auth.isAuthenticated, update);
router.delete('/:id', auth.isAuthenticated, _delete);

module.exports = router;

function getAll(req, res, next) {
  bankService
    .getAll(req.query, req.params.orgId)
    .then(banks => res.json(banks))
    .catch(err => next(err));
}

function getById(req, res, next) {
  bankService
    .getById(req.params.id)
    .then(bank => (bank ? res.json(bank) : res.sendStatus(404)))
    .catch(err => next(err));
}

function create(req, res, next) {
  bankService
    .create(req.body, req.params.orgId)
    .then(bank => res.json(bank))
    .catch(err => next(err));
}

function update(req, res, next) {
  bankService
    .update(req.params.id, req.body)
    .then(bank => res.json(bank))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  bankService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
