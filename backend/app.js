const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const claimRoutes = require("./routes/claim.routes");
const airportRoutes = require("./routes/airport.routes");
const airlineRoutes = require("./routes/airline.routes");
const flightRoutes = require("./routes/flight.routes");

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/airports", airportRoutes);
app.use("/api/airlines", airlineRoutes);
app.use("/api/flights", flightRoutes);

sequelize.sync();

module.exports = app;
