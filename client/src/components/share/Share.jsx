import { useContext, useRef, useState } from 'react'
import './share.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from "../../context/AuthContext";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";


const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    const API_URL = "http://localhost:8800/api/";

    const submitHandler =  async (e) => {
        e.preventDefault(); 
        const newPost = {
            userId: user._id,
            description: desc.current.value
        }
        if(file) {
            const data = new FormData(); 
           
            data.append("file", file);
            data.append("name", file.name);
            newPost.img = file.name;

            try {
                await axios.post(`${API_URL}upload`, data);
            }catch(e){

            }
        }
        try {
            await axios.post(`${API_URL}posts`, newPost);
            window.location.reload();
        }catch (e) {

        }
    }
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img className='shareProfileImg' src={user.profilePicture? PF+ user.profilePicture: PF + "person/noAvatar.png"} alt="" />
                <input ref={desc} className='shareInput' placeholder={` What's in your mind ${user.username}?`} />
            </div>
            <hr className='shareHr' />
            {/* to display the image before posting */}
            {file && (
                <div className="shareImgContainer">
                    <img src={URL.createObjectURL(file)} alt="" className='shareImg' />
                    <CancelIcon className='shareCancelIcon' onClick={() => setFile(null)}/>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMediaIcon htmlColor='tomato' className='shareIcon'/>
                        <span className="shareOptionText">Media</span>
                        <input style={{display: "none"}} type="file" id="file" accept='.png, .jpeg, .jpg' onChange={(e)=> setFile(e.target.files[0])}/>
                    </label>  

                    <div className="shareOption">
                        <LabelIcon htmlColor='blue' className='shareIcon'/>
                        <span className="shareOptionText">Tag</span>
                    </div>

                    <div className="shareOption">
                        <RoomIcon htmlColor='green' className='shareIcon'/>
                        <span className="shareOptionText">Location</span>
                    </div>

                    <div className="shareOption">
                        <EmojiEmotionsIcon htmlColor='goldenrod' className='shareIcon'/>
                        <span className="shareOptionText">Feeling</span>
                    </div>
                </div>

                <button type='submit' className="shareButton">Share</button>
            </form>
        </div>
    </div>
  )
}

export default Share