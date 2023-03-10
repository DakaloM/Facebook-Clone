import { React, useState, useEffect } from 'react'
import "./profile.css";
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const API_URL = "http://localhost:8800/api/"; 
  const username = useParams().username;
 

  useEffect(() =>{
    const fetchUser = async () => {
        const url = `${API_URL}users?username=${username}`;
        const res = await axios.get(url);
        setUser(res.data);
    }
    fetchUser();  
    
  },[username])
  
  return (
    <div>
        <Topbar />
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img className='profileCoverImg' src={user.coverPicture? PF+user.coverPicture : PF+"person/noCover.png"} alt="" />
                    <img className='profileUserImg' src={user.profilePicture? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" />
                </div>
                <div className="profileInfo">
                    <h4 className='profileInfoName'>{user.username}</h4>
                    <span className="profileInfoDesc">{user.description}</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar user={user} profile/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile