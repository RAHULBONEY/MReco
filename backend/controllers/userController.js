const User = require("../models/userModel.js");

const register = async (req, res) => {
  try {
    const { name, email, pref, artists, place } = req.body;
    const profilepic = req.file ? { url: req.file.path } : null;

    const user = await User.create({
      name,
      email,
      pref: pref.split(","),
      artists: artists.split(","),
      place,
      profilepic,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};
const found = async () => {
  try {
    const user = await User.findOne()
      .sort({ _id: -1 })
      .select("pref artists name");
    if (!user) {
      res.send("no user data");
    }
    return {
      name: user.name,
      pref: user.pref,
      artists: user.artists,
    };
  } catch (error) {
    res.status(400).json({
      message: "Error user preferences and languages not found",
      error,
    });
  }
  console.log(`${pref},${artists}`);
};
const fetchArtists = async (req, res) => {
  try {
    const user = await User.findOne()
      .sort({ _id: -1 }) // Fetch the latest user
      .select("artists");
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ artists: user.artists });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user artists",
      error,
    });
  }
};

module.exports = { register, found, fetchArtists };
