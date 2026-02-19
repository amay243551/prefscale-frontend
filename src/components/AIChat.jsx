import { useState } from "react";

export default function AIChat() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/ai/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            Prefscale AI
            <span onClick={() => setIsOpen(false)}>✖</span>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? "user-msg" : "ai-msg"}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="ai-msg">Thinking...</div>}
          </div>

          <div className="chat-input">
            <input
              value={input}
              placeholder="Ask about testing..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
