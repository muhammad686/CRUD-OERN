// database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hr", "hr", "hr", {
  dialect: "oracle",
  host: "localhost",
  port: "1521",
  dialectOptions: {
    connectString: "localhost:1521/XEPDB1", // Add the service string here
  },
});

module.exports = sequelize;
