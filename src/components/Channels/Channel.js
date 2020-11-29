import React from "react";
import ChannelInfo from "./ChannelInfo";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";
import Messages from "./Messages";

export default function Channel({ user }) {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages />
        <ChatInputBox user={user} />
      </div>
      <Members />
    </div>
  );
}
