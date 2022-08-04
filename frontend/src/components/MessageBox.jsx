import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { appContext } from '../context/appContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const MessageBox = () => {

  const user = useSelector((state) => state.user);

  const [message, setMessage] = useState("");

  const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(appContext);
  const messageEndRef = useRef(null);

  useEffect(() => {

    scrollToBottom();

  }, [messages]);
  
  function getFormattedDate() {

    const date = new Date();
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString();

    const final_month = month.length > 1 ? month : "0" + month;
    const day = date.getDate().toString();

    const final_day = day.length > 1 ? day : "0" + day;

    return final_month + "/" + final_day + "/" + year;


  }

    const todayDay = getFormattedDate();

    socket.off("room-messages").on("room-messages", (roomMessages) => {
      console.log("Message from", roomMessages);
      setMessages(roomMessages);
    });

    function scrollToBottom() {
      messageEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!message) return;

        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;

        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, user, time, todayDay);
        setMessage("");
    }

  return (
    <div className='message'>
      <div className="message-all">
        {user && !privateMemberMsg?._id && <p className='currentRoom'>You are in the {currentRoom} room</p>}
        {user && privateMemberMsg?._id && <div className='concersationWith'>Your conversation with {privateMemberMsg.name} <img src={privateMemberMsg.image} alt={privateMemberMsg.name} /></div>}

        {!user && (<h1 className='please-login'>Please Login!</h1>)}
        
        {user && messages.map(({ _id: date, messagesByDate }, idx) => (
          <div key={idx}>
            <span className="dateMessage">{date}</span>
            {messagesByDate?.map(({ content, time, from: sender }, idxMsg) => (
              <div className={sender?.email === user?.email ? "messageView" : "incomingMessage"} key={idxMsg}>
                  <div className="message-box">
                    <div className="message-from">
                      <img className='userImage' src={sender.image} alt={sender.name} />
                      <p className='userName'>{sender.id === user._id ? "You" : sender.name}</p>
                    </div>
                    <h4 className="messageContent">{content}</h4>
                    <span className="messageTime">{time}</span>
                  </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ))}

        </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input type="text" disabled={!user} onChange={(e) => setMessage(e.target.value)} value={message} className='input-message' placeholder='Your Message' />
        <button type="submit" disabled={!user}><FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </div>
  )
}

export default MessageBox
