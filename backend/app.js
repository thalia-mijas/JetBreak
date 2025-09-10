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
const usersRoutes = require("./routes/users.routes");
const User = require("./models/user.model");
const Claim = require("./models/claim.model");
const Airline = require("./models/airline.model");
const Airport = require("./models/airport.model");
const { seedAirlines } = require("./controllers/airlines.controller");
const { seedAirports } = require("./controllers/airports.controller");
const cors = require("cors");

app.use(express.json());

// Permitir solicitudes desde tu frontend
app.use(
  cors({
    origin: "http://localhost:5173", // o '*' si estás en desarrollo
    credentials: true,
  })
);

// Rutas
app.use("/api", authRoutes);
app.use("/api/claims", claimsRoutes);
app.use("/api/airports", airportsRoutes);
app.use("/api/stores", storesRoutes);
app.use("/api/airlines", airlinesRoutes);
app.use("/api/flights", flightsRoutes);
app.use("/api/offers", offersRoutes);
app.use("/api/users", usersRoutes);

// Define las relaciones de BD
User.hasMany(Claim, { foreignKey: "user_id" });
Claim.belongsTo(User, { foreignKey: "user_id" });

Airline.hasMany(Claim, { foreignKey: "airline_id" });
Claim.belongsTo(Airline, { foreignKey: "airline_id" });

// Sincroniza
sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("Tablas sincronizadas");

    // Check if we need to seed the database
    const airlineCount = await Airline.count();
    const airportCount = await Airport.count();

    if (airlineCount === 0) {
      console.log("Seeding airlines...");
      await seedAirlines();
    }

    if (airportCount === 0) {
      console.log("Seeding airports...");
      await seedAirports();
    }

    console.log("✅ Database initialization complete");
  })
  .catch((err) => console.error("Error al sincronizar:", err));

module.exports = app;
