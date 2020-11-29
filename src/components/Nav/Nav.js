import React, { useEffect, useState } from "react";
import useCollection from "../../custom/useCollections";

export default function Nav() {
  const channels = useCollection("channels");
  return (
    <div className="Nav">
      <div className="User">
        <img
          className="UserImage"
          alt="whatever"
          src="https://placekitten.com/64/64"
        />
        <div>
          <div>Tashfeen Rao</div>
          <div>
            <button className="text-button">log out</button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map((channel) => (
          <a key={channel.id} href={`/channel/${channel.id}`}>
            {channel.id}
          </a>
        ))}
      </nav>
    </div>
  );
}
