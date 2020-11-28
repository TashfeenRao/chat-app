import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function Messages() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    db.collection("channels")
      .doc("random")
      .collection("messages")
      .onSnapshot((snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setMessage(docs);
      });
  }, []);
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {message.map((mess, index) => {
        return index === 0 ? (
          <div>
            <div className="Day">
              <div className="DayLine" />
              <div className="DayText">12/6/2018</div>
              <div className="DayLine" />
            </div>
            <div className="Message with-avatar">
              <div className="Avatar" />
              <div className="Author">
                <div>
                  <span className="UserName">Ryan Florence </span>
                  <span className="TimeStamp">3:37 PM</span>
                </div>
                <div className="MessageContent">{mess.text} hello</div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="Message no-avatar">
              <div className="MessageContent">{mess.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
