import {React, useState, useEffect} from 'react'
import "./conversation.css";
import axios from 'axios';

const Conversation = ({conversation, user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const API_URL = "http://localhost:8800/api/";
  const [otherUser, setOtherUser] = useState([]);
  


  
  useEffect(() => {
    const otherUserId = conversation.members.find((id) => id !== user._id); 
    const getOtherUser = async () => {
      try {
        const res = await axios.get(`${API_URL}users?userId=${otherUserId}`)
        setOtherUser(res.data)
      }catch(e){
        console.log(e)
      }
    }

    getOtherUser();
  },[user, conversation])


  return (
    <div className='conversation'>
      <img className='conversationImg' src={otherUser.profilePicture? PF + otherUser.profilePicture: `${PF}person/noAvatar.png`} alt="" />
      <span className='conversationName'>{otherUser.username}</span>
    </div>
  )
}

export default Conversation