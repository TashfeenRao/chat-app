import { useState } from "react";
import { firebase } from "../../firebase";
import "./Login.css";

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
      <div className="Login__left"> </div>
      <div className="Login__right">
        <div className="Login__signin">
          <div class="sub-main">
            <div className="login__card">
              <div className="login__cardItem">
                <div className="login__google">
                  <h1>Sign In with </h1>
                  <img
                    className="button__container"
                    alt=""
                    src="https://img.icons8.com/bubbles/50/000000/google-logo.png"
                  />
                </div>
                <button onClick={handleSignIn} className="button-three">
                  <div className="button__container">
                    <span>Sign In</span>
                  </div>
                </button>
                {authError && (
                  <div>
                    <i>{authError.message}</i>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
