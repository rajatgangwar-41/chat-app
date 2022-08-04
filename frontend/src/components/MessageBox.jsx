import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons

const MessageBox = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <div className='message'>
      <div className="message-all">
      <form onSubmit={handleSubmit} className="message-form">
        <input type="text" disabled={!user} onChange={(e) => setMessage(e.target.value)} value={message} className='input-message' placeholder='Your Message' />
        <button type="submit" disabled={!user}><FontAwesomeIcon icon={faPaperPlane} /></button>
      </form>
    </div>
    </div>
  )
}

export default MessageBox
