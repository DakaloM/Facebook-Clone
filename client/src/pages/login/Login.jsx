import {React, useRef, useContext} from 'react'
import "./login.css";
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";

const Login = () => {
    const email = useRef();
    const password = useRef();
    const {user, isFetching, dispatch} = useContext(AuthContext);
 
    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
    }

    console.log(user);
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">AllSocial</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on AllSocial
                </span>
            </div>

            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input className='loginInput' required placeholder='Email' type="email" ref={email}/>
                    <input className='loginInput' required  placeholder='Password' minLength="6" type="password" ref={password }/>
                    <button 
                            type="submit" className="loginButton"
                            disabled={isFetching}
                        >
                        {isFetching? <CircularProgress color="inherit" size="20px"/>: "Log In"}
                    </button>
                    <span className="loginForgot">Forfot Password?</span>
                    <Link to="/register" style={{
                            textDecoration: "none",
                            width: "60%",
                            margin: "0 auto",
                        }}>
                    <button className="loginRegisterButton">{isFetching? <CircularProgress color="inherit" size="20px"/>: "Create new Account"}</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login