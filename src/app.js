require("dotenv").config();

const express = require("express");
const app = express();

// 🔐 Core middlewares FIRST
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ✅ CORS must come before routes
app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true,
    }),
);

// ✅ Body parser
app.use(express.json());

// ✅ Cookie parser
app.use(cookieParser());

// 🗄️ Database connection
require("./utils/dataBase");

// 📦 Import routes
const userRouter = require("./Routers/routes");
const adminRoute = require("./admin/Routes/adminRoutes");
const eventRouter = require("./admin/Routes/eventsRoute/upcomingEvent");
const eventCalendarRouter = require("./admin/Routes/eventsRoute/eventCalendar");
const eventRouterList = require("./eventPage/eventData");
const coreTeamRouter = require("./admin/Routes/coreTeam/coreTeam");
const collaborationRouter = require("./admin/Routes/collaborations/collaborationsRoute");
const coreTeam = require("./Routers/coreTeamRoute");
const pastMemberRouter = require("./Routers/pastMembers.routes");
const router = require("./admin/Routes/startupList");
const startUpRoute = require("./Routers/startUp.Route");
const collaborationRouterUser = require("./Routers/collaboration.routes");

// 🚀 Routes AFTER middleware
app.use("/", userRouter);
app.use("/", adminRoute);
app.use("/", eventRouter);
app.use("/", eventCalendarRouter);
app.use("/", eventRouterList);
app.use("/", coreTeamRouter);
app.use("/", collaborationRouter);
app.use("/", coreTeam);
app.use("/", pastMemberRouter);
app.use("/", router);
app.use("/", startUpRoute);
app.use("/", collaborationRouterUser);
// 🎯 Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
