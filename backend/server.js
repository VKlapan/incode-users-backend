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

app.use((req, res) => {
  res.status(404).json({ code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Serever error" } = err;
  res.status(status).json({ code: status, message });
});

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}!`.cyan);
});
