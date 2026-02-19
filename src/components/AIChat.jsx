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
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#007bff",
          color: "white",
          padding: "12px 15px",
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 9999,
          fontSize: "20px"
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "450px",
            background: "white",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#007bff",
              color: "white",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Prefscale AI
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(false)}
            >
              ✖
            </span>
          </div>

          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.role === "user" ? "#007bff" : "#f1f1f1",
                  color:
                    msg.role === "user" ? "white" : "black",
                  padding: "6px 10px",
                  borderRadius: "10px",
                  maxWidth: "75%",
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div>Thinking...</div>}
          </div>

          <div
            style={{
              display: "flex",
              padding: "10px",
              gap: "5px",
              borderTop: "1px solid #ddd",
            }}
          >
            <input
              value={input}
              placeholder="Ask about testing..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{ flex: 1, padding: "6px" }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
