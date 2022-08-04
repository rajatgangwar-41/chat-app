import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
              <Route path='/' element={<SVGClipPathElement />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>
  );
}

export default App;