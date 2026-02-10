const express = require("express");
const userRouter = require("./Routers/routes");
const app = express();
require("dotenv").config();
require("./utils/dataBase");
app.use("/", userRouter);
app.listen(1998, async () => {
	console.log("successfully listening to the 1998 port");
});
