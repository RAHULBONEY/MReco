const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const useRoutes = require("./routes/userRoutes.js");
const spotRoutes = require("./routes/spotifyRoutes.js");
const mongoose = require("mongoose");
const { connectDB } = require("./utils/connect.js");
const { urlencoded } = require("body-parser");
require("dotenv/config");

const app = express();
const MONGO_URL = process.env.DB_STRING;
const PORT = process.env.PORT || 4000;
// Connect to MongoDB database
connectDB(MONGO_URL);
// Middlewares
app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//calling routes
//4000/login
app.use("/", spotRoutes);
app.use("/user", useRoutes);
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
