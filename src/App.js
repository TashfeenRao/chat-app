import React, { useEffect, useState } from "react";
import Channel from "./components/Channels/Channel";
import Nav from "./components/Nav/Nav";
import { db, firebase, userPresence } from "./firebase";
import "./app.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login/Login";

function App() {
  const user = useAuth();

  if (!user) return <Login />;
  return (
    <Router>
      <div className="App" style={{ backgroundColor: "#ffff" }}>
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
        userPresence(user);
        db.collection("users").doc(user.id).set(user, { merge: true });
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};

export default App;
