import { faMoon, faSignal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appContext } from '../context/appContext.js';
import { addNotifications, resetNotifications } from '../features/userSlice.js';

const Sidebar = () => {

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  
  const {socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom} = useContext(appContext);

  function changeRoom(room, isPublic = true) {
    if(!user) {
      return alert("Please Login!");
    }
    
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if(isPublic) {
      setPrivateMemberMsg(null);
    }

    dispatch(resetNotifications(room));

  }
  
  socket.off("notifications").on("notifications", (room) => {

      if(currentRoom !== room) dispatch(addNotifications(room));

  });

    useEffect(() => {

      if(user) {
        setCurrentRoom('Balkans');
        getRooms();
        socket.emit('join-room', 'Balkans');
        socket.emit('new-user');
      }

    }, [setCurrentRoom, socket, user]);


   socket.off("new-user").on("new-user", (payload) => {
    
      console.log(payload);
      setMembers(payload);


  });

  function getRooms() {
    fetch("http://localhost:5000/rooms").then((res) => res.json()).then((data) => setRooms(data));
  }


  function orderIds(id1, id2) {
    if(id1 > id2) {

      return id1 + "-" + id2;
 
    } else {

      return id2 + "-" + id1;

    }

  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    changeRoom(roomId, false);
  }


  if(!user) {
    return (<></>);
  }

  return (
    <div className='sidebar'>
        <h2>Rooms</h2>
        <div className="rooms">
            {rooms.map((room, idx) => (
                <button onClick={() => changeRoom(room)} className={room === currentRoom ? "activeRoom" : ""} key={idx}>
                  {room} {currentRoom !== room && <span className="badge">{user.newMessages[room]}</span>}
                </button>
            ))}
        </div>
        <div className="margin"></div>
        <h2>Members</h2>
        <div className="rooms">
            {members.map((member) => (
                <button onClick={() => handlePrivateMemberMsg(member)} className={privateMemberMsg?._id === member?._id ? "activeRoom" : ""} key={member._id} disabled={member._id === user._id}>
                  <img src={member.image} alt={members.name} className="membersImage" />
                  {member.name}
                  {member.status === "Online" ? <FontAwesomeIcon className='icon' icon={faSignal} /> : <FontAwesomeIcon className='icon' icon={faMoon} />}
                  <span className='badgeNumber'>{user.newMessages[orderIds(member._id, user._id)]}</span>
                </button>
            ))}
        </div>
    </div>
  )
}

export default Sidebar
