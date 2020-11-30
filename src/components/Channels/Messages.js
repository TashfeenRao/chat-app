import useCollection from "../../custom/useCollections";
import useDoc from "../../custom/useDocWithCache";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/isSameDay";

export default function Messages({ channelId }) {
  const message = useCollection(`channels/${channelId}/messages`, "createdAt");
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {message.map((mess, index) => {
        const previous = message[index - 1];
        const showDate = decideDate(previous, mess);
        const avatarCondition = decideAvatar(previous, mess);
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
  const author = useDoc(mess.user.path);
  return (
    <div>
      {showDate && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {formatDate(mess.createdAt.seconds * 1000, "d/M/Y")}
          </div>
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
            <span className="TimeStamp">
              {formatDate(mess.createdAt.seconds * 1000, "h:mm a")}
            </span>
          </div>
          <div className="MessageContent">{mess.text}</div>
        </div>
      </div>
    </div>
  );
};

const decideDate = (previous, message) => {
  if (!previous) return true;

  const isNewDay = !isSameDay(
    message.createdAt.seconds * 1000,
    previous.createdAt.seconds * 1000
  );
  return isNewDay;
};

const decideAvatar = (previous, message) => {
  if (!previous) return true;
  if (message.user.id !== previous.user.id) return true;

  const forAwhile =
    message.createdAt.seconds - previous.createdAt.seconds > 180;

  return forAwhile;
};
