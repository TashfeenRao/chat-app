import React, { useEffect, useState } from "react";
import useCollection from "../../custom/useCollections";

export default function Messages() {
  const message = useCollection("channels/random/messages", "createdAt");

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {message.map((mess, index) => {
        const showDate = false;
        const previous = message[index - 1];
        const avatarCondition = !previous || mess.user.id !== previous.user.id;
        return avatarCondition ? (
          <ShowAvatar key={mess.id} mess={mess} showDate={showDate} />
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

const ShowAvatar = ({ mess, showDate }) => {
  return (
    <div>
      {showDate && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/6/2018</div>
          <div className="DayLine" />
        </div>
      )}

      <div className="Message with-avatar">
        <div className="Avatar" />
        <div className="Author">
          <div>
            <span className="UserName">Tashfeen Rao </span>
            <span className="TimeStamp">3:37 PM</span>
          </div>
          <div className="MessageContent">{mess.text}</div>
        </div>
      </div>
    </div>
  );
};
