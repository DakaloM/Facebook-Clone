import { React, useState, useEffect, useContext } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import "./feed.css"
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';



const Feed = ({username}) => {
  const API_URL = "http://localhost:8800/api/";
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext)


  useEffect(() =>{ 
    const fetchPosts = async () => {
        const url = username ?  `${API_URL}posts/profile/${username}` :  `${API_URL}posts/timeline/${user._id}`;
        const res = await axios.get(url);
        const postList = res.data;
        setPosts(postList.sort((p1,p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
    }
    fetchPosts();
    
  },[username, user._id]);


  return (
    <div className='feed'>
      
      <div className="feedWrapper">
        {username? username === user.username && <Share /> : <Share /> }
        {posts && posts.map((p) =>(
          <Post key={p._id} post={p}/>
        ))}
        
      </div>
    </div>
  )
}

export default Feed