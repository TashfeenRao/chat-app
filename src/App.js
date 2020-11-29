import React, { useEffect, useState } from "react";
import Channel from "./components/Channels/Channel";
import Nav from "./components/Nav/Nav";
import { firebase } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          photoUrl: user.photoURL,
          id: user.uid,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };
  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel />
    </div>
  ) : (
    <div className="Login">
      <h1>Chat !</h1>
      <button onClick={handleSignIn}>SignIn</button>
    </div>
  );
}

export default App;
