import React, { useState } from "react";
import { db } from "../../firebase";

export default function ChatInputBox({ user }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection("channels")
      .doc("random")
      .collection("messages")
      .add({
        user: db.collection("users").doc(user.id),
        text: input,
        createdAt: new Date(),
      });
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
