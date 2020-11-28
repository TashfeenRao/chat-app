import React, { useState } from "react";
import { db } from "../../firebase";

export default function ChatInputBox() {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection("channels")
      .doc("random")
      .collection("messages")
      .add({ text: input, createdAt: new Date() });
    event.target.reset();
  };
  return (
    <form onSubmit={handleSubmit} className="ChatInputBox" readOnly>
      <input
        className="ChatInput"
        placeholder="Message #general"
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}
