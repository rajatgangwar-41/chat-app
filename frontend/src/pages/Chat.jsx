import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageBox from '../components/MessageBox'


const Chat = () => {
  return (
    <div className='chat-container'>
      <div className="chat-row">
        <div className="chat-col">
          <Sidebar />
        </div>
        <div className="chat-col">
          <MessageBox />
        </div>
      </div>
    </div>
  )
}

export default Chat
