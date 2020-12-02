import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import ChannelInfo from "./ChannelInfo";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";
import Messages from "./Messages";

export default function Channel({ user }) {
  const { channelId } = useParams();

  useEffect(() => {
    db.doc(`users/${user.id}`).update({
      [`channels.${channelId}`]: true,
    });
  }, [user.id, channelId]);
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members channelId={channelId} />
    </div>
  );
}
