import {React, useState, useContext, useEffect, } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import "./messenger.css";
import axios from 'axios';
import { current } from '@reduxjs/toolkit'
import { useRef } from 'react'

const Messenger = () => {
    const API_URL = "http://localhost:8800/api/";
    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [newMessage , setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const scrollRef = useRef()

    useEffect(() => {
        const getMessage = async () => {
            try{
                const res = await axios.get(`${API_URL}messages/${currentChat?._id}`)
                setMessages(res.data)
            } catch(e){
                console.log(e)
            }
        }
        getMessage()
    }, [currentChat])
    useEffect(() => {
        
        const getConversations = async () =>{
            try{
                const res = await axios.get(`${API_URL}conversations/${user._id}`);
                setConversations(res.data);
            }catch(e){
                console.log(e);
            }
        }

        getConversations();
    },[user])

    const handleSumit = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            conversationId: currentChat._id,
            text: newMessage
        }

        try{
            const res = await axios.post(`${API_URL}messages`, message)
            setMessages([...messages, res.data])
            setNewMessage("")
        }catch(e){
            console.log(e)
        }
    }

    // To scroll to the bottom aftereach new message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])
     
  return (
    <div>
        <Topbar />
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder='Search for friends' className='chatMenuInput' />
                    {conversations && (
                        conversations.map((conv) => (
                            <div  onClick={() => setCurrentChat(conv)}>
                            <Conversation key={conv._id} conversation={conv} user={user} />
                            </div>
                        ))
                    )}
                   
                    
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat? (
                    <>
                        <div className="chatBoxTop">
                            {messages.map((message) => (
                                <div ref={scrollRef}>
                                    <Message message={message} own={message.sender === user._id}/>
                                </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea 
                                onChange={(e) => setNewMessage(e.target.value)} 
                                value={newMessage}
                                className='chatMessageInput' 
                                placeholder='Write message..'
                            >

                            </textarea>
                            <button className="chatSubmitButton" onClick={handleSumit}>Send</button>
                        </div>
                    </>
                    ): <span className='noConvoText'>Open a Conversation to start a chat</span>}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Messenger