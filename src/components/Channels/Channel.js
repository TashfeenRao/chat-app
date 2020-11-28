import React from "react";
import ChannelInfo from "./ChannelInfo";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";
import Messages from "./Messages";

export default function Channel() {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages />
        <ChatInputBox />
      </div>
      <Members />
    </div>
  );
}
