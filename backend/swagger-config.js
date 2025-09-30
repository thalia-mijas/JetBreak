const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "JetBreak API",
    description: "Documentación de endpoints para JetBreak",
  },
  host: "localhost:3000",
  schemes: ["http"],
  components: {
    schemas: {
      Claim: {
        type: "object",
        properties: {
          id: { type: "integer" },
          user_id: { type: "integer" },
          airline_id: { type: "integer" },
          type: { type: "string" },
          flight_iata: { type: "string" },
          date: { type: "string", format: "date-time" },
          description: { type: "string" },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      Flight: {
        type: "object",
        properties: {
          id: { type: "integer" },
          user_id: { type: "integer" },
          flight_iata: { type: "string" },
          airline_id: { type: "integer" },
          origin_iata: { type: "string" },
          date_departure: { type: "string", format: "date-time" },
          destination_iata: { type: "string" },
          date_arrival: { type: "string", format: "date-time" },
          state: { type: "string" },
        },
      },
      Airline: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          iata_code: { type: "string" },
        },
      },
      Airport: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          iata_code: { type: "string" },
          city: { type: "string" },
          country: { type: "string" },
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/*.js"]; // rutas

swaggerAutogen(outputFile, endpointsFiles, doc);
