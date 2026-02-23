//imports;
require("dotenv").config();
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay");
const app = express();
const db = require("./config/mongoose-connection");
const usermodel = require("./models/usermodel");
const productmodel = require("./models/productmodel");
const ownermodel = require("./models/ownermodel");
const ownerRouter = require("./routes/ownerRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const path = require("path");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secretkey",
  }),
);
app.use(flash());
app.use("/owner", ownerRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
//route
app.get("/", (req, res) => {
  if (req.cookies.ownertoken) {
    res.clearCookie("ownertoken");
  }
  let alert = req.flash("tokenInfo");
  res.render("login.ejs", { alert });
});
app.listen(3000, () => {
  if (process.env.NODE_ENV == "development") {
    console.log("in development mode");
  } else {
    console.log("in production mode");
  }
});
