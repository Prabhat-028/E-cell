const express = require("express");
const userRouter = require("./Routers/routes");
const adminRoute = require("./admin/Routes/adminRoutes");
const app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
const eventRouter = require("./admin/Routes/eventsRoute/upcomingEvent");
const eventCalendarRouter = require("./admin/Routes/eventsRoute/eventCalendar");
const eventRouterList = require("./eventPage/eventData");
const coreTeamRouter = require("./admin/Routes/coreTeam/coreTeam");

app.use(cookieParser());

require("dotenv").config();
require("./utils/dataBase");
app.use("/", userRouter);
app.use("/", adminRoute);
app.use("/", eventRouter);
app.use("/", eventCalendarRouter);
app.use("/", eventRouterList);
app.use("/", coreTeamRouter);

app.listen(process.env.PORT, async () => {
	console.log("successfully listening to the 1998 port");
});
