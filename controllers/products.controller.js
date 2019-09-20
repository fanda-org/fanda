const express = require('express');
const router = express.Router();
const productService = require('../services/product.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  productService
    .getAll(req.query, req.params.orgId)
    .then(items => res.json(items))
    .catch(err => next(err));
}

function getById(req, res, next) {
  productService
    .getById(req.params.id)
    .then(item => (item ? res.json(item) : res.sendStatus(404)))
    .catch(err => next(err));
}

function create(req, res, next) {
  productService
    .create(req.body, req.params.orgId)
    .then(item => res.json(item))
    .catch(err => next(err));
}

function update(req, res, next) {
  productService
    .update(req.params.id, req.body)
    .then(item => res.json(item))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  productService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
