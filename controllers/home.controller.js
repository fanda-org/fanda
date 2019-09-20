const express = require('express');
const router = express.Router();
const auth = require('../_helpers/passport-auth');

/* GET home page. */
router.get('/', auth.isAuthenticated, function(req, res) {
  const currentOrg = req.session.organization;
  if (currentOrg) {
    res.render('home', { active: { home: true }, currentUser: req.session.user, currentOrg: currentOrg });
  } else {
    res.redirect('/organizations');
  }
});

router.get('/terms', function(req, res) {
  res.render('home/terms', { emptyLayout: true });
});

module.exports = router;
