import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosConfig from '../../Services/axios/axios';
import { useStateValue } from '../../Services/StateProvider';
import { showToast } from '../../Services/Reducer/index';
import success from '../../Assets/Img/check.svg';
import warning from '../../Assets/Img/warning.svg';
import './style.css'

const SignUp = () => {
    const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useStateValue();

  const signUp = (e:any) => {
    e.preventDefault();
    
      axiosConfig
      .post(`/api/auth/signup`, {Email: email, Password: password, Name: name})
      .then((response) => {
          console.log(response.data);
        dispatch({
            type: "SET_USER",
            user: response.data
        })
        showToast('success',dispatch, {
            title: "Registered && LoggedIn Successfully",
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
    <div className="SignUp">
      <Link to="/">
        <img
          src={require("../../Assets/Img/Icon.png")}
          alt=""
          className="SignUp_logo"
        />
      </Link>

      <div className="SignUp_container">
        <h1>Sign-Up</h1>

        <form action="">
        <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        
          <h5>E-mail/Username</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="SignUp_signInButton" onClick={signUp}>
            Sign Up
          </button>
        </form>

        <p>
          Already have an account? <Link to='/login'> click here to Sign In.</Link>
        </p>
      </div>
    </div>

  )
}

export default SignUp