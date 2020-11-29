import React, { useEffect, useState } from "react";
import Channel from "./components/Channels/Channel";
import Nav from "./components/Nav/Nav";
import { firebase } from "./firebase";

function App() {
  const user = useAuth();
  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel />
    </div>
  ) : (
    <Login />
  );
}

const Login = () => {
  const handleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <h1>Chat !</h1>
      <button onClick={handleSignIn}>SignIn</button>
    </div>
  );
};

const useAuth = () => {
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

  return user;
};

export default App;
