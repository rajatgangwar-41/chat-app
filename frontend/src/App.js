import { useState } from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {appContext, socket} from "./context/appContext.js";

function App() {

  const user = useSelector((state) => state.user);

  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});

  return (
    <appContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          {!user && (
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </>
          )}
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>
    </appContext.Provider>
  );
}

export default App;