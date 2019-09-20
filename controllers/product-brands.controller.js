const express = require('express');
const router = express.Router();
const brandService = require('../services/product-brand.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  brandService
    .getAll(req.query, req.params.orgId)
    .then(cats => res.json(cats))
    .catch(err => next(err));
}

function getById(req, res, next) {
  brandService
    .getById(req.params.id)
    .then(cat => (cat ? res.json(cat) : res.sendStatus(404)))
    .catch(err => next(err));
}

function create(req, res, next) {
  brandService
    .create(req.body, req.params.orgId)
    .then(cat => res.json(cat))
    .catch(err => next(err));
}

function update(req, res, next) {
  brandService
    .update(req.params.id, req.body)
    .then(cat => res.json(cat))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  brandService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
