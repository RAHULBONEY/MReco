const express = require("express");
const {
  register,
  found,
  fetchArtists,
} = require("../controllers/userController.js");
const { multerUp } = require("../middlewares/multer.js");
const User = require("../models/userModel.js");
const app = express.Router();

app.post("/register", multerUp.single("profilepic"), register);
app.get("/fetchprefandartists", async (req, res) => {
  const result = await found();
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "No data found" });
  }
});
app.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the collection
    res.status(200).json(users); // Send the users as JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});
app.get("/fetchartists", fetchArtists);

module.exports = app;
