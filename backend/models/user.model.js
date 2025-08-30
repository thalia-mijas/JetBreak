const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  document_type: {
    type: DataTypes.ENUM("DNI", "Cédula"),
    allowNull: false,
  },
  identity_card: {
    type: DataTypes.STRING,
    primaryKey: true,
    validate: {
      documentoValido() {
        const tipo = this.document_type;
        const doc = this.identity_card;

        if (tipo === "DNI") {
          const dniRegex = /^\d{8}[A-Z]$/;
          if (!dniRegex.test(doc)) {
            throw new Error("Formato de DNI inválido");
          }

          const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
          const numero = parseInt(doc.slice(0, 8), 10);
          const letraEsperada = letras[numero % 23];

          if (doc[8] !== letraEsperada) {
            throw new Error("Letra de control inválida en DNI");
          }
        }

        if (tipo === "Cédula") {
          if (!/^\d{10}$/.test(doc)) {
            throw new Error("La cédula debe tener 10 dígitos");
          }

          const provincia = parseInt(doc.slice(0, 2), 10);
          if (provincia < 1 || provincia > 24) {
            throw new Error(
              "Código de provincia inválido en cédula ecuatoriana"
            );
          }

          const digitos = doc.split("").map(Number);
          let suma = 0;

          for (let i = 0; i < 9; i++) {
            let valor = digitos[i];
            if (i % 2 === 0) {
              valor *= 2;
              if (valor > 9) valor -= 9;
            }
            suma += valor;
          }

          const digitoVerificador = (10 - (suma % 10)) % 10;
          if (digitoVerificador !== digitos[9]) {
            throw new Error(
              "Dígito verificador inválido en cédula ecuatoriana"
            );
          }
        }

        if (!["DNI", "Cédula"].includes(tipo)) {
          throw new Error("Tipo de documento no reconocido");
        }
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
