const express = require("express");
const router = express.Router();
const auth = require("../_helpers/passport-auth");
const orgService = require("../services/organization.service");
const {
  OrganizationViewModel
} = require("../viewmodels/organization.viewmodel");
const toastr = require("../_helpers/toastr-type");

const defaultQuery = { code: "{not}FANDA", active: "true", sort_by: "code" };

/**
 * ROUTES
 */

// INDEX
router.get("/", auth.isAuthenticated, (req, res) => {
  return res.render("organizations", {
    active: { organizations: true },
    currentUser: req.session.user,
    query: req.query.open,
    currentOrg: req.session.organization
  });
});

// INDEX - AJAX
router.get("/list", auth.isAuthenticated, (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  var { active, ...qry } = defaultQuery;
  if (req.query.open == "true") {
    qry = defaultQuery;
  }
  var combinedQry = { ...req.query, ...qry };

  orgService
    .getAll(combinedQry)
    .then(orgs => {
      const result = res.json(orgs);
      return result;
    })
    .catch(err => next(err));
});

//GET - ADD/EDIT
router.get("/edit/:id", auth.isAuthenticated, (req, res, next) => {
  if (req.params.id == "new") {
    var orgModel = new OrganizationViewModel();
    return res.render("organizations/edit", {
      active: { organizations: true },
      currentUser: req.session.user,
      org: orgModel,
      currentOrg: req.session.organization,
      mode: "Create"
    });
  } else {
    orgService
      .getById(req.params.id)
      .then(org => {
        return res.render("organizations/edit", {
          active: { organizations: true },
          currentUser: req.session.user,
          org: org,
          currentOrg: req.session.organization,
          mode: "Edit"
        });
      })
      .catch(err => {
        return res.render("organizations", {
          active: { organizations: true },
          currentUser: req.session.user,
          query: req.query.open,
          currentOrg: req.session.organization,
          message: { type: toastr.WARNING, text: err }
        }); //next();
      });
  }
});

// POST - SAVE
router.post("/save", auth.isAuthenticated, (req, res, next) => {
  orgService
    .save(req.body)
    .then(org => {
      return res.redirect("/organizations");
    })
    .catch(err => {
      //console.log("Error:", err);
      var org = req.body;
      return res.render("organizations/edit", {
        active: { organizations: true },
        currentUser: req.session.user,
        org: org,
        currentOrg: req.session.organization,
        mode: org._id ? "Edit" : "Create",
        message: {
          type: toastr.WARNING,
          text: err.code == 11000 ? "Code or Name already exists" : err.errmsg
        }
      });
    });
});

// DELETE - REMOVE
router.post("/delete/:id", auth.isAuthenticated, (req, res, next) => {
  orgService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
});

// GET SELECT BY ID - OPEN ORGANIZATION
router.get("/select/:id", auth.isAuthenticated, (req, res, next) => {
  orgService
    .getById(req.params.id)
    .then(org => {
      if (org) {
        req.session.organization = org;
        return res.redirect("/");
      } else {
        return res.sendStatus(404);
      }
    })
    .catch(err => next(err));
});

module.exports = router;
