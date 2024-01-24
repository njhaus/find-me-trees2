// Imports
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import methodOverride from 'method-override';
import cors from 'cors';


// Auth and security
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });

// Models
import User from "./models/user.js";

// Express Setup
const app = express();
const port = 3008;

// Express connection
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Mongoose Setup/connection

const mongoConnect = process.env.ENVIRONMENT === 'production' ? `mongodb+srv://njhaus:${process.env.MONGO_ATLAS}@cluster0.qt7sgci.mongodb.net/?retryWrites=true&w=majority` : "mongodb://127.0.0.1:27017/treesDB";

async function main() {
  try {
    await mongoose.connect(mongoConnect), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedToplology: true,
      useFindAndModify: false
    };
    console.log("Mongoose Connection successful");
  } catch (err) {
    console.error(err);
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main();


// middleware for allowing react to fetch() from server
const corsOrigin =
  process.env.ENVIRONMENT === "production"
    ? "https://find-me-trees-client-production.up.railway.app"
    : "http://localhost:5173";

    console.log(corsOrigin)

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `${corsOrigin}`); 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


  app.use(
    cors({
      origin: corsOrigin,
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "PATCH"],
      credentials: true,
      preflightContinue: false,
    }));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))


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

// Cookie setup / cookie parser
app.use(cookieParser(process.env.SESSION_SECRET));

// setup method override
app.use(methodOverride("_method"));

// Session setup
const sessionConfig = {
  name: "mr-session",
  secret: process.env.SESSION_SECRET,
  // store: store,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'None',
  },
};
app.use(session(sessionConfig));

// Passport setup
// Add this before defining routes But AFTER session setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes
import userRoute from './routes/user_routes.js';
import browseRoute from "./routes/browse_routes.js";
import loginRoute from "./routes/login_routes.js";
import treeRoute from "./routes/tree_routes.js"
import dataRoute from './routes/data_routes.js'

app.use('/user', userRoute);
app.use('/browse', browseRoute);
app.use('/login', loginRoute);
app.use('/tree', treeRoute);
app.use('/data', dataRoute);


// Generic route -- for dev purposes only
app.get("/", (req, res) => {

  res.send("Express server is working.");
});

app.post("/", (req, res) => {
  res.send("Express server is working.");
});

// Error catching routes

app.use((err, req, res, next) => {
  console.error(err);
  res.status(403).send(err);
});

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



// // Crypto -- get random bytes

// crypto.randomBytes(64, (err, buf) => {
//   if (err) throw err;
//   console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
// });