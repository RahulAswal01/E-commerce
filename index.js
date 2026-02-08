//imports;
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
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
app.use(flash());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secretkey",
  }),
);
app.use("/owner", ownerRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
//route
app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.listen(3000);
