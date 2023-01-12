import React from 'react'
import "./chartOnline.css";

const ChatOnline = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className='chatOnlineImg' src={`${PF}person/1.jpeg`} alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">John Doe</span>
        </div>
    </div>
  )
}

export default ChatOnline