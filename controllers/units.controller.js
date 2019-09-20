const express = require('express');
const router = express.Router();
const unitService = require('../services/unit.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  unitService
    .getAll(req.query, req.params.orgId)
    .then(units => res.json(units))
    .catch(err => next(err));
}

function getById(req, res, next) {
  unitService
    .getById(req.params.id)
    .then(unit => (unit ? res.json(unit) : res.sendStatus(404)))
    .catch(err => next(err));
}

function create(req, res, next) {
  unitService
    .create(req.body, req.params.orgId)
    .then(unit => res.json(unit))
    .catch(err => next(err));
}

function update(req, res, next) {
  unitService
    .update(req.params.id, req.body)
    .then(unit => res.json(unit))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  unitService
    .delete(req.params.id)
    .then(() => res.status(204).json({}))
    .catch(err => next(err));
}
