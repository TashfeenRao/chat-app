import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBISpu66jDd6DLuUC5dW7ByU3yrkBlsiNk",
  authDomain: "chat-app-8b4ed.firebaseapp.com",
  databaseURL: "https://chat-app-8b4ed.firebaseio.com",
  projectId: "chat-app-8b4ed",
  storageBucket: "chat-app-8b4ed.appspot.com",
  messagingSenderId: "84285058558",
  appId: "1:84285058558:web:1be51772efa04ea0c224af",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function App() {
  const [channels, setChannels] = useState([
    { topic: "someone please talk", id: "general" },
  ]);

  useEffect(() => {
    const docs = [];
    db.collection("channels").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
    });
  }, []);
  return (
    <div className="App">
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
      <div className="Channel">
        <div className="ChannelMain">
          <div className="ChannelInfo">
            <div className="Topic">
              Topic: <input className="TopicInput" value="Awesome stuff" />
            </div>
            <div className="ChannelName">#general</div>
          </div>
          <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            <div>
              <div className="Day">
                <div className="DayLine" />
                <div className="DayText">12/6/2018</div>
                <div className="DayLine" />
              </div>
              <div className="Message with-avatar">
                <div className="Avatar" />
                <div className="Author">
                  <div>
                    <span className="UserName">Ryan Florence </span>
                    <span className="TimeStamp">3:37 PM</span>
                  </div>
                  <div className="MessageContent">Alright, lets do this.</div>
                </div>
              </div>
            </div>
            <div>
              <div className="Message no-avatar">
                <div className="MessageContent">works now?</div>
              </div>
            </div>
          </div>
          <div className="ChatInputBox">
            <input className="ChatInput" placeholder="Message #general" />
          </div>
        </div>
        <div className="Members">
          <div>
            <div className="Member">
              <div className="MemberStatus offline" />
              Ryan Florence
            </div>
            <div className="Member">
              <div className="MemberStatus online" />
              cleverbot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
