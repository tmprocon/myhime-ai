"use client";

import { useState } from "react";

type Msg = { role: "assistant" | "user"; text: string };

const WELCOME: Msg = {
  role: "assistant",
  text: "Hey Eugene — tell me what you’re working on today, and I’ll help you plan it step-by-step.",
};

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);

  function newChat() {
    setMessages([WELCOME]);
    setInput("");
  }

  function send() {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");

    // placeholder "AI reply" for now
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Got it. Next, tell me your goal and your deadline." },
      ]);
    }, 250);
  }

  return (
    <div style={{ height: "calc(100vh - 120px)", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Top row actions */}
      <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", display: "flex", gap: 10 }}>
        <button
          onClick={newChat}
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(255,255,255,0.07)",
            color: "#e8eefc",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          + New chat
        </button>

        <button
          onClick={() => alert("Voice coming next")}
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            color: "#e8eefc",
            cursor: "pointer",
          }}
        >
          🎤 Talk
        </button>

        <button
          onClick={() => alert("Voice reply coming next")}
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            color: "#e8eefc",
            cursor: "pointer",
          }}
        >
          🔊 Speak
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", paddingRight: 6 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "12px 14px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.10)",
                background: m.role === "user" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.28)",
                lineHeight: 1.5,
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>
                {m.role === "user" ? "You" : "MyHiMe"}
              </div>
              <div>{m.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Type a message…"
          style={{
            flex: 1,
            padding: "14px 14px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            color: "#e8eefc",
            outline: "none",
          }}
        />
        <button
          onClick={send}
          style={{
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(255,255,255,0.10)",
            color: "#e8eefc",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Send
        </button>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", fontSize: 12, opacity: 0.6 }}>
        Tip: Press Enter to send • Voice buttons are next
      </div>
    </div>
  );
}
