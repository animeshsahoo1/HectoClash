import './App.css'
import { assets } from './assets'
import Navbar from './components/navbar/Navbar'
import Landing from './pages/landing/landing'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/main/Main'
import Game from './pages/game/Game'
import GameRoom from './pages/gameRoom/GameRoom'
import Profile from './pages/profile/Profile'


function App() {
  const loggedUserId = localStorage.getItem('loggedUserId');
  return (
    <>
      {loggedUserId && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Main />} />
        <Route path='/games' element={<Game />} />
        <Route path='/games/:gameId' element={<GameRoom />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>


    </>

  )
}

export default App
