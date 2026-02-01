//imports;
const express = require("express");
const app = express();
const db = require("./config/mongoose-connection");
const usermodel = require("./models/usermodel");
const productmodel = require("./models/productmodel");
const ownerRouter = require("./routes/ownerRoute");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");

//middlewares
app.use("/owner", ownerRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

app.listen(3000);
