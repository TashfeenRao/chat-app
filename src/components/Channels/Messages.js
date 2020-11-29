import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCollection from "../../custom/useCollections";
import { db } from "../../firebase";

export default function Messages({ channelId }) {
  const message = useCollection(`channels/${channelId}/messages`, "createdAt");
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

const useDoc = (path) => {
  const [docs, setDocs] = useState({});

  useEffect(() => {
    db.doc(path).onSnapshot((doc) => setDocs({ ...doc.data(), id: doc.id }));
  }, []);
  return docs;
};

const ShowAvatar = ({ mess, showDate }) => {
  const author = useDoc(mess.user.path);
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
        <div
          className="Avatar"
          style={{ backgroundImage: author ? `url(${author.photoUrl})` : "" }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName} </span>
            <span className="TimeStamp">3:37 PM</span>
          </div>
          <div className="MessageContent">{mess.text}</div>
        </div>
      </div>
    </div>
  );
};
