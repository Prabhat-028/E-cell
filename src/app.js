const express = require("express");
const userRouter = require("./Routers/routes");
const adminRoute = require("./admin/Routes/adminRoutes");
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());

require("dotenv").config();
require("./utils/dataBase");
app.use("/", userRouter);
app.use("/", adminRoute);
app.listen(1998, async () => {
	console.log("successfully listening to the 1998 port");
});
