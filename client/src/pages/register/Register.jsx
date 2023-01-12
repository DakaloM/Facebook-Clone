import {React, useRef, } from 'react'
import "./register.css";
import axios from "axios"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
    const API_URL = "http://localhost:8800/api/";
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confPassword = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(confPassword.current.value !== password.current.value){
            confPassword.current.setCustomValidity("Passwords do not match!");
        }else {
             const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
             }
             try{
                await axios.post(`${API_URL}auth/register`, user);
                navigate("/login"); 
             }catch(e){
                console.log(e)
             }
        }
    }
    return (
        <div className='register'>
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">AllSocial</h3>
                    <span className="registerDesc">
                        Connect with friends and the world around you on AllSocial
                    </span>
                </div>
     
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <input required className='registerInput' placeholder='Username' type="text" ref={username}/>
                        <input required className='registerInput' placeholder='Email' type="email" ref={email} />
                        <input minLength="6" required className='registerInput' placeholder='Password' type="password" ref={password}/>
                        <input required className='registerInput' placeholder='Confirm Password' type="password" ref={confPassword}/>
                        <button type='submit' className="registerButton">Register</button>
                        <Link to="/login" style={{
                            textDecoration: "none",
                            width: "60%",
                            margin: "0 auto",
                        }}>
                        <button className="registerRegisterButton">Log In Instead</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
      )
}

export default Register