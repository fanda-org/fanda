require("rootpath")();
const createError = require("http-errors");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");

// const cookieParser = require('cookie-parser');
const uuid = require("uuid/v4");
const session = require("express-session");
// const FileStore = require('session-file-store')(session);

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const config = require("config.json");

const passportAccount = require("_helpers/passport-auth");

// const jwt = require('./_helpers/jwt');
// const errorHandler = require('./_helpers/error-handler');

// var cache = require('memory-cache');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var orgsRouter = require('./routes/organizations');

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "default",
    layoutsDir: __dirname + "/views/_shared/layouts/",
    partialsDir: __dirname + "/views/_shared/partials/",
    helpers: {
      assign: function(varName, varValue, options) {
        if (!options.data.root) {
          options.data.root = {};
        }
        options.data.root[varName] = varValue;
      },
      section: function(name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      }
    }
  })
);
app.set("view engine", "hbs");
if (app.get("env") === "production") {
  app.enable("view cache");
}
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// Session
// app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    // eslint-disable-next-line no-unused-vars
    genid: req => {
      // console.log('Inside the session middleware');
      // console.log(req.sessionID);
      return uuid(); // use UUIDs for session IDs
    },
    // store: new FileStore(),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// use JWT auth to secure the api
// app.use(jwt());

app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public"), { maxage: "24h" }));

// Configure passport.js to use the local strategy
passport.use(
  new LocalStrategy({ usernameField: "userName" }, passportAccount.authenticate)
);
// tell passport how to serialize the user
passport.serializeUser(passportAccount.serializeUser);
passport.deserializeUser(passportAccount.deserializeUser);

// Allow front-end access to node_modules folder
// app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// configure cache middleware
// const memCache = new cache.Cache();

// const cacheMiddleware = duration => {
//   return (req, res, next) => {
//     let key = '__express__' + req.originalUrl || req.url;
//     let cacheContent = memCache.get(key);
//     if (cacheContent) {
//       res.send(cacheContent);
//       return;
//     } else {
//       res.sendResponse = res.send;
//       res.send = body => {
//         memCache.put(key, body, duration * 1000);
//         res.sendResponse(body);
//       };
//       next();
//     }
//   };
// };

app.use("/", require("./controllers/home.controller"));
app.use("/users", require("./controllers/users.controller"));

// app.get('/authrequired', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send('you hit the authentication endpoint\n');
//   } else {
//     res.redirect('/');
//   }
// });

app.use("/banks", require("./controllers/banks.controller"));
app.use(
  "/contact-categories",
  require("./controllers/contact-categories.controller")
);
app.use("/contacts", require("./controllers/contacts.controller"));
app.use("/invoices", require("./controllers/invoices.controller"));
app.use("/organizations", require("./controllers/organizations.controller"));
app.use("/product-brands", require("./controllers/product-brands.controller"));
app.use(
  "/product-categories",
  require("./controllers/product-categories.controller")
);
app.use(
  "/product-segments",
  require("./controllers/product-segments.controller")
);
app.use(
  "/product-varieties",
  require("./controllers/product-varieties.controller")
);
app.use("/products", require("./controllers/products.controller"));
app.use(
  "/unit-conversions",
  require("./controllers/unit-conversions.controller")
);
app.use("/units", require("./controllers/units.controller"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// global error handler
// app.use(errorHandler);

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { emptyLayout: true });
});

module.exports = app;
