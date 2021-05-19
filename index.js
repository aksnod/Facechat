const cookieParser = require("cookie-parser");
const express = require("express");
//const cookieParser=require('cookie-parser');
const port = 8000;
const app = express();
const expressLayout = require("express-ejs-layouts");

// use for session cookie
const session = require("express-session");
const passport = require("passport");
// const passportJWT = require("passport-jwt");
const passportJWT = require('./config/passport-jwt-strategy');
const passportLocal = require("./config/passport-local-strategy");

const db = require("./config/mongoose");

//store the cookie data
const mongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");

const flash = require("connect-flash");
const cusFlashmdwr = require("./config/middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());

app.use(cookieParser());
//include static file
app.use(express.static("./assets/"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(expressLayout);

//extract style and script from subpages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codian",
    //TODO change secret key before deployment in production phase
    secret: "blawSecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new mongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect mongodb setup is ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(cusFlashmdwr.setFlash);

// routing the Express
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("error at runinng server", err);
    return;
  }
  console.log("Server Start Successfully: ${port}");
});
