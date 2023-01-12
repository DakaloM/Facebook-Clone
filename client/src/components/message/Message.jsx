import {React, useEffect, useState, useContext } from 'react'
import "./message.css";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { format } from "timeago.js"

const Message = ({message, own}) => {
    const API_URL = "http://localhost:8800/api/";
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const senderId = message.sender
    const [sender, setSender] = useState([]);

    useEffect(() => {
        const getSender = async () =>{
          try{
            const res = await axios.get(`${API_URL}users?userId=${senderId}`)
            setSender(res.data)
          }catch(e){
            console.log(e)
          }
        }

        getSender()
    },[])
  return (
    <div className={own ? "message own": "message"}>
        <div className="messageTop">
            <img className='messageImg' src={
              sender.profilePicture? PF+ sender.profilePicture: `${PF}person/noAvatar.png`
            } alt="" />
            <p className='messageText'>
                {message.text}
            </p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message