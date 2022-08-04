import React from 'react'
import MessageBox from '../components/MessageBox'
import Sidebar from '../components/Sidebar'

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
