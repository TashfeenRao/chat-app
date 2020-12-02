import React from "react";
import useCollection from "../../custom/useCollections";

export default function Members({ channelId }) {
  const members = useCollection("users", undefined, [
    `channels.${channelId}`,
    "==",
    true,
  ]);
  return (
    <div className="Members">
      <div>
        {members.map((m) => {
          return (
            <div className="Member" key={m.id}>
              <div className="MemberStatus online" />
              {m.displayName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
