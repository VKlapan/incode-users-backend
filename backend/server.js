require("colors");
const dotenv = require("dotenv");
const path = require("path");
const connectDb = require("../config/db.js");

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const CONFIG_PATH = path.join(__dirname, "..", "config", ".env");

dotenv.config({ path: CONFIG_PATH });

app.use("/api/v1/users", require("./routes/usersRoutes.js"));

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}!`.cyan);
});
