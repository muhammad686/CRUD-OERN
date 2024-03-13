// app.js
const express = require("express");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");
const sequelize = require("./config/database"); // Include Sequelize instance
require("./models/student"); // Include the Student model

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/students", studentRoutes);

// Sync the Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
