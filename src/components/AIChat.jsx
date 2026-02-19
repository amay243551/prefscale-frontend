import { useState, useEffect, useRef } from "react";

export default function AIChat() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // ✅ removed sessionStorage
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  /* ===== Load Chat History From Backend ===== */
  useEffect(() => {
    if (!token) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/api/ai/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Failed to load chat history");
      }
    };

    fetchHistory();
  }, [token]);

  /* ===== Auto Scroll ===== */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ===== Welcome Message (Only If No History) ===== */
  useEffect(() => {
    if (isOpen && messages.length === 0 && token) {
      setMessages([
        {
          role: "assistant",
          text: "👋 Hi! I am Prefscale AI. Ask me anything about testing concepts or Prefscale services.",
        },
      ]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || !token) return;

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠ Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
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
          fontSize: "20px",
          transition: "transform 0.2s ease",
        }}
      >
        💬
      </div>

      {/* Chat Window */}
      <div
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          width: "360px",
          height: "480px",
          background: "white",
          borderRadius: "14px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          zIndex: 9999,
          overflow: "hidden",
          transform: isOpen ? "scale(1)" : "scale(0)",
          transformOrigin: "bottom right",
          transition: "transform 0.25s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#007bff",
            color: "white",
            padding: "12px",
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
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

        {/* Body */}
        <div
          style={{
            flex: 1,
            padding: "12px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            background: "#f9f9f9",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf:
                  msg.role === "user" ? "flex-end" : "flex-start",
                background:
                  msg.role === "user" ? "#007bff" : "#e4e4e4",
                color:
                  msg.role === "user" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "12px",
                maxWidth: "75%",
                fontSize: "14px",
              }}
            >
              {msg.text}
            </div>
          ))}

          {loading && <div>Thinking...</div>}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            display: "flex",
            padding: "10px",
            gap: "6px",
            borderTop: "1px solid #ddd",
          }}
        >
          <input
            value={input}
            placeholder="Ask about testing..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
