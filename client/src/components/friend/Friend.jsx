import React from 'react'
import "./friend.css";

const Friend = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
        <img src={PF+ user.profilePicture} alt='' className='sidebarFriendImg'/>
        <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}

export default Friend