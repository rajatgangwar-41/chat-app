import React from 'react'

const Sidebar = () => {
  
  const rooms =[world,europe,asia,africa, america, australia]

  return (
    <div className='sidebar'>
        <h2>Rooms</h2>
        <div className="rooms">
            {rooms.map((room, idx) => (
                <span key={id}> {room} </span>
            ))}
        </div>
        </div>
  )
}

export default Sidebar
