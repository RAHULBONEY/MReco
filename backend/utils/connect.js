const { mongoose } = require("mongoose");

const connectDB = (uri) => {
  console.log("Connecting to:", uri); // Logs the connection URI
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to Database"))
    .catch((err) => {
      throw err;
    });
};

module.exports = { connectDB };
