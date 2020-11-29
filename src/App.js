import React, { useEffect, useState } from "react";
import Channel from "./components/Channels/Channel";
import Nav from "./components/Nav/Nav";
import { db, firebase } from "./firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const user = useAuth();

  if (!user) return <Login />;
  return (
    <Router>
      <div className="App">
        <Nav user={user} />
        {user && (
          <Switch>
            <Route path="/channel/:channelId">
              <Channel user={user} />
            </Route>
            <Redirect to="/channel/general" />
          </Switch>
        )}
      </div>
    </Router>
  );
}

const Login = () => {
  const [authError, setAuthError] = useState({});
  const handleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };

  return (
    <div className="Login">
      <h1>Chat !</h1>
      <button onClick={handleSignIn}>SignIn</button>
      {authError && (
        <div>
          <p>Sorry, There is proble while loging</p>
          <i>{authError.message}</i>
          <p>Please, try again</p>
        </div>
      )}
    </div>
  );
};

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          id: firebaseUser.uid,
        };
        setUser(user);
        db.collection("users").doc(user.id).set(user, { merge: true });
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};

export default App;
