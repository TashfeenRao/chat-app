import React, { useState } from "react";
import Channel from "./components/Channels/Channel";
import Nav from "./components/Nav/Nav";
import { firebase } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };
  return user ? (
    <div className="App">
      <Nav />
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
