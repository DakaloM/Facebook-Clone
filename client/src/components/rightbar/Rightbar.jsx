import {useContext, useEffect, useState,  } from 'react'
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from '../online/Online';
import axios from "axios";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Rightbar = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const API_URL = "http://localhost:8800/api/";
  const [friends, setFriends] = useState([]);
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(currentUser.followings.includes(user?._id));
  
  useEffect(() => {
    setIsFollowing(currentUser.followings.includes(user?._id));
  }, [currentUser,user]);

  console.log(isFollowing)
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const url = `${API_URL}users/friends/${user._id}`;
        const friendList = await axios.get(url);
        setFriends(friendList.data);
      }catch(e){
        console.log(e);
      }
    }

    getFollowers();
  }, [user]);

  const handleFollowing = async () => {
    try{
       
      if(isFollowing){
        await axios.put(`${API_URL}users/${user._id}/unfollow`, {userId: currentUser._id});
        dispatch({type: "UNFOLLOW", payload: user._id});
      } else{
        await axios.put(`${API_URL}users/${user._id}/follow`, {userId: currentUser._id})
        dispatch({type: "FOLLOW", payload: user._id});
      }
    }catch(e){
      console.log(e);
    }
    
    setIsFollowing(!isFollowing);
  }
  
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className='birthdayImg' src={PF + "gift.png" } alt="" />
          <span className="birthdayText">
            <b>Mike </b> and <b>3 other friends</b> have their birthdays today
          </span>
        </div>

        <img className='rightbarAd' src={PF + "ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friens</h4>
        <ul className="rightbarFriendList">

        {Users.map((user) => (
          <Online user={user} key={user.id} />
          
        ))}
          
         
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {

    return (
      <>
          {user.username !== currentUser.username && (
            
            <button className="rightbarFollowButton" onClick={handleFollowing}>
              {isFollowing? "Unfollow" : "Follow"}
              {isFollowing? <RemoveIcon /> : <AddIcon />}
            </button>
            

          )}

          <h4 className="rightbarTitle">User Information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">CiRelationshipty:</span>
              <span className="rightbarInfoValue">{
                user.relationship === 1? "Sigle":
                user.relationship === 2? "Maried": "Chose not to say"
              }</span>
            </div>
          </div>
          <h4 className="rightbarTitle">Following</h4>
          <div className="rightbarFollowings">
            {friends.map((friend) => (
              <Link style={{textDecoration:"none", color: "black"}}to={`/profile/${friend.username}`}>
                <div className="rightbarFollowing">
                  <img className='rightbarFollwingImg' src={
                      friend.profilePicture ? PF+ friend.profilePicture: PF + "person/noAvatar.png"
                    } alt="" />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
              </Link>
            )
              )}

          </div>
      </>
    )
  }

  return (
    <div  className='rightbar'>
      <div className="rightbarWrapper">
        {
          user? <ProfileRightbar /> : <HomeRightbar />
        }
      </div>
    </div>
  )
}

export default Rightbar