// Imports
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";


// Express Setup
const app = express();
const port = 3008;

app.get('/', (req, res) => {
    res.send('Express server is working.')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// Body-parser setup
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Static setup
// Import and initialize stuff to make __dirname work
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "client")));

// Mongoose Setup

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
