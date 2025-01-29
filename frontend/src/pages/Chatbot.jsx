import React, { useState } from "react";
import axios from "axios";
import "../Styles/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: "user", content: userInput };
    setMessages((prev) => [...prev, newMessage]);

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:11434/chatbot", {
        message: userInput,
      });

      const botReply = {
        role: "bot",
        content: response.data.botResponse,
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, I couldn't process your request." },
      ]);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Chat with MrecAI</h2>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className="loading-indicator">
            <p>Thinking...</p>
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
