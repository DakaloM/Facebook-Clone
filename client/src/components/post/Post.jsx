import {React , useState, useEffect, useContext} from 'react';
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import { format} from 'timeago.js';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';


const Post = ({post}) => {
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsliked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const API_URL = "http://localhost:8800/api/";
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsliked(post.likes.includes(currentUser._id));
    },[post.likes, currentUser._id])

    useEffect(() =>{
        const fetchUser = async () => {
            const url = `${API_URL}users?userId=${post.userId}`;
            const res = await axios.get(url);
            setUser(res.data);
        }
        fetchUser();
        
      },[post.userId])

    const likeHandler = () => {
        try{
            axios.put(`${API_URL}posts/${post._id}/like`, {userId: currentUser._id})
        } catch(err){

        }
        setLikes(isLiked? likes -1 : likes + 1);
        setIsliked(!isLiked);
    }

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img className='postProfileImg' src={user.profilePicture? PF+user.profilePicture : PF + "person/noAvatar.png"} alt="" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVertIcon className=''/>
                </div>
            </div>
 
            <div className="postCenter">
                <span className="postText">{post?.description}</span>
                <img className="postImg" src={PF + post.img} alt="" />
            </div>

            <div className="postBottom">
                <div className="posrBottomLeft">
                    <img  className='likeIcon' src={PF+ "like.png"}  alt="" 
                        onClick={() => likeHandler()}/>
                    <img className='likeIcon' src={PF+ "heart.png"} alt="" 
                        onClick={() => likeHandler()}/>
                    <span className="postLikeCounter">{likes} people liked it</span>
                </div>
                <div className="posrBottomRight">
                    <span className="postCommentText">{post.comment} Comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post