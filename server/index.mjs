// Imports
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";


// Auth and security
import passport from 'passport'
import LocalStrategy from 'passport-local'
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });

// Models
import User from "./models/user.js";

// Express Setup
const app = express();
const port = 3008;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// Body parser -- parse application/json
app.use(bodyParser.json())


// Static setup
// Import and initialize stuff to make __dirname work
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "client")));


// Mongoose Setup/connection
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/treesDB");
    console.log("Mongoose Connection successful");
  } catch (err) {
    console.err(err);
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main();


// Cookie setup / cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));


// Session setup
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  name: "mr.sessionman",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    secure: true,
    domain: "findmetrees.com",
    httpOnly: true,
  },
};

app.use(session(sessionConfig));


// Passport setup

// Passport setup
// Add this before defining routes But AFTER session setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middleware for allowing react to fetch() from server
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
});


// Routes
import userRoute from './routes/user_routes.js';
import browseRoute from "./routes/browse_routes.js";
import loginRoute from "./routes/login_routes.js";

app.use('/user', userRoute);
app.use('/browse', browseRoute);
app.use('/login', loginRoute);


// Generic route -- for dev purposes only
app.get("/", (req, res) => {
  res.cookie("test_unsigned_cookie", "this is a not signed cookie test");
  res.cookie('test_cookie', 'this is a test', {signed: true})
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);
  res.send("Express server is working.");
});


// Express connection
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// Error catching routes

// app.use("*", (req, res, next) => {
//   const error = new AppError("This route does not exist.", 404);
//   console.log(error);
//   console.log("MESSAGE:" + error.message);
//   next(error);
// });

// app.use((err, req, res, next) => {
//   console.log(err);
//   const { message = "Sorry, something went wrong.", status = 500 } = err;
//   console.log(message, status);
//   res.status(status);
//   res.render("error/error.ejs", { status, message });
// });
