import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../Services/StateProvider";
import axiosConfig from '../../Services/axios/axios';
import success from '../../Assets/Img/check.svg';
import warning from '../../Assets/Img/warning.svg';
import "./style.css";
import { showToast } from "../../Services/Reducer";

const SignIn = () => {
  const navigation = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useStateValue();

  const signIn = (e:any) => {
    e.preventDefault();
    
      axiosConfig
      .post(`/api/auth/login`, {username: username, password: password})
      .then((response) => {
        dispatch({
            type: "SET_USER",
            user: response.data
        })
        showToast('success',dispatch, {
            title: "LoggedIn Successfully",
            image: success,
          })
          navigation('/')
      })
      .catch((error) => {
        showToast('warning',dispatch, {
            title: error?.message,
            image: warning,
          })
      })
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          src={require("../../Assets/Img/Icon.png")}
          alt=""
          className="login_logo"
        />
      </Link>

      <div className="login_container">
        <h1>Sign-in</h1>

        <form action="">
          <h5>E-mail/Username</h5>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login_signInButton" onClick={signIn}>
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to Pizza Hut's Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Internet-Based Ads.
        </p>

        <button onClick={() => navigation('/register')} className="login_registerButton">
          Create your Pizza Hut Account
        </button>
      </div>
    </div>
  );
};

export default SignIn;
