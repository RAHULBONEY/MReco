const express = require("express");
const app = express.Router();
const { login, callback } = require("../controllers/spotifyController.js");
app.get("/login", login);
app.get("/callback", callback);

module.exports = app;
