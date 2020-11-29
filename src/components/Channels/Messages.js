import React, { useEffect, useState } from "react";
import useCollection from "../../custom/useCollections";

export default function Messages() {
  const message = useCollection("channels/random/messages", "createdAt");

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {message.map((mess, index) => {
        return index === 0 ? (
          <div key={mess.id}>
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
          <div key={mess.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{mess.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
