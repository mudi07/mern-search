const AdRouter = require("./routes/ad");
const CompanyRouter = require("./routes/company");

const express = require("express");
const mongoose = require("mongoose");

// const Company = require("./models/company");
// const companyData = JSON.parse(fs.readFileSync("./companies.json"));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// Connect to mongoDB
mongoose
  .connect("mongodb://localhost:27888", { dbName: "searchApp" })
  .then(async () => {
    console.log("Connected to DB successfully.");
    // await Company.insertMany(companyData);
  })
  .catch((err) => {
    console.log(`Failed to connect to DB. Message: ${err.message}`);
  });

mongoose.connection.on("error", (err) => {
  console.error(`Error on mongoose connection, Message: ${err}`);
});

// Create routes
app.use("/api/ad", AdRouter);
app.use("/api/company", CompanyRouter);

const PORT = 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
