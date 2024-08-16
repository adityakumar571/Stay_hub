if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log(process.env.secret);

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const EjsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const flash = require("connect-flash");
const session = require("express-session");

const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to DB");
}

main().catch((err) => {
  console.error("Connection error:", err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", EjsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: process.env.SECRET || "mysupersecretcode", // Use environment variable for the secret if available
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Fixed cookie expiration time
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.get("/", (req, res) => {
  res.send("I am root");
});

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not found!"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

const PORT = process.env.PORT || 8080; // Use dynamic port binding
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});