import React from "react";
import { useParams } from "react-router-dom";
import ChannelInfo from "./ChannelInfo";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";
import Messages from "./Messages";

export default function Channel({ user }) {
  const { channelId } = useParams();
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members />
    </div>
  );
}
