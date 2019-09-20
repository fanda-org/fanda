const express = require('express');
const router = express.Router();
const contactService = require('../services/contact.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  contactService
    .getAll(req.query, req.params.orgId)
    .then(parties => res.json(parties))
    .catch(err => next(err));
}

function getById(req, res, next) {
  contactService
    .getById(req.params.id)
    .then(party => (party ? res.json(party) : res.sendStatus(404)))
    .catch(err => next(err));
}

function create(req, res, next) {
  contactService
    .create(req.body, req.params.orgId)
    .then(party => res.json(party))
    .catch(err => next(err));
}

function update(req, res, next) {
  contactService
    .update(req.params.id, req.body)
    .then(party => res.json(party))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  contactService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
