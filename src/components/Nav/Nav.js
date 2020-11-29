import { Link } from "react-router-dom";
import useCollection from "../../custom/useCollections";
import { firebase } from "../../firebase";

export default function Nav({ user }) {
  const channels = useCollection("channels");
  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={user && user.photoUrl} />
        <div>
          <div>{user && user.displayName}</div>
          <div>
            <button
              onClick={() => {
                firebase.auth().signOut();
              }}
              className="text-button"
            >
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map((channel) => (
          <Link key={channel.id} to={`/channel/${channel.id}`}>
            {channel.id}
          </Link>
        ))}
      </nav>
    </div>
  );
}
