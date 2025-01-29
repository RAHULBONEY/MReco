const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());


const corsOptions = {
  origin: "http://localhost:5174", // Frontend URL
  methods: ["GET", "POST"], 
};
app.use(cors(corsOptions)); 

const PORT = process.env.PORT || 11434;

// Handle POST request to /chatbot
app.post("/chatbot", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Ollama API URL
    const ollamaUrl = "http://127.0.0.1:11434/api/generate"; // endpoint

    // Request payload to Ollama API
    const response = await axios.post(ollamaUrl, {
      model: "llama3.2:3b", // Model name
      prompt: userMessage, // User's message as the prompt
      stream: false,
    });

    // Send the bot response back to the frontend
    res.json({
      botResponse: response.data.response, 
    });
  } catch (error) {
    console.error("Error handling chatbot request:", error);
    res.status(500).json({ error: "Something went wrong with the model." });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
