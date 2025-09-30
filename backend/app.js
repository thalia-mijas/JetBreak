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
const Flight = require("./models/flight.model");
const { seedAirlines } = require("./controllers/airlines.controller");
const { seedAirports } = require("./controllers/airports.controller");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use(cookieParser());

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Permitir solicitudes desde tu frontend
app.use(
  cors({
    origin: "http://localhost:5173", // o '*' si estás en desarrollo
    credentials: true,
  })
);

// Rutas
app.use("/api/", authRoutes);
app.use("/api/", claimsRoutes);
app.use("/api/", airportsRoutes);
app.use("/api/", storesRoutes);
app.use("/api/", airlinesRoutes);
app.use("/api/", flightsRoutes);
app.use("/api/", offersRoutes);
app.use("/api/", usersRoutes);

// Define las relaciones de BD
User.hasMany(Claim, { foreignKey: "user_id" });
Claim.belongsTo(User, { foreignKey: "user_id" });

Airline.hasMany(Claim, { foreignKey: "airline_id" });
Claim.belongsTo(Airline, { foreignKey: "airline_id" });

User.hasMany(Flight, { foreignKey: "user_id" });
Flight.belongsTo(User, { foreignKey: "user_id" });

Airline.hasMany(Flight, { foreignKey: "airline_id", as: "flights" });
Flight.belongsTo(Airline, { foreignKey: "airline_id", as: "airline" });

Airport.hasMany(Flight, { foreignKey: "origin_iata", as: "departingFlights" });
Airport.hasMany(Flight, {
  foreignKey: "destination_iata",
  as: "arrivingFlights",
});
Flight.belongsTo(Airport, { foreignKey: "origin_iata", as: "origin" });
Flight.belongsTo(Airport, {
  foreignKey: "destination_iata",
  as: "destination",
});

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
