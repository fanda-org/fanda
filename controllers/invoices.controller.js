const express = require('express');
const router = express.Router();
const invoiceService = require('../services/invoice.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  invoiceService
    .getAll(req.query, req.params.orgId)
    .then(invoices => res.json(invoices))
    .catch(err => next(err));
}

function getById(req, res, next) {
  invoiceService
    .getById(req.params.id)
    .then(invoice => (invoice ? res.json(invoice) : res.sendStatus(404)))
    .catch(err => next(err));
}

function create(req, res, next) {
  invoiceService
    .create(req.body, req.params.orgId)
    .then(invoice => res.json(invoice))
    .catch(err => next(err));
}

function update(req, res, next) {
  invoiceService
    .update(req.params.id, req.body)
    .then(invoice => res.json(invoice))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  invoiceService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
