const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const claimsRoutes = require("./routes/claims.routes");
const airportsRoutes = require("./routes/airports.routes");
const airlinesRoutes = require("./routes/airlines.routes");
const flightsRoutes = require("./routes/flights.routes");
const storesRoutes = require("./routes/stores.routes");
const offersRoutes = require("./routes/offers.routes");

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/claims", claimsRoutes);
app.use("/api/airports", airportsRoutes);
app.use("/api/stores", storesRoutes);
app.use("/api/airlines", airlinesRoutes);
app.use("/api/flights", flightsRoutes);
app.use("/api/offers", offersRoutes);

sequelize.sync();

module.exports = app;
