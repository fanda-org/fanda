const express = require('express');
const router = express.Router();
const convService = require('../services/unit-conversion.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  convService
    .getAll(req.query, req.params.orgId)
    .then(convs => res.json(convs))
    .catch(err => next(err));
}

function getById(req, res, next) {
  convService
    .getById(req.params.id)
    .then(conv => (conv ? res.json(conv) : res.sendStatus(404)))
    .catch(err => next(err));
}

function create(req, res, next) {
  convService
    .create(req.body, req.params.orgId)
    .then(conv => res.json(conv))
    .catch(err => next(err));
}

function update(req, res, next) {
  convService
    .update(req.params.id, req.body)
    .then(conv => res.json(conv))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  convService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
