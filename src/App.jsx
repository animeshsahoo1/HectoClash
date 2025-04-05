import './App.css'
import { assets } from './assets'
import Navbar from './components/navbar/Navbar'
import Landing from './pages/landing/landing'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/main/Main'
import Game from './pages/game/Game'


function App() {
  const loggedUserId = localStorage.getItem('loggedUserId');
  return (
    <>
      {loggedUserId && <Navbar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Main />} />
        <Route path='/games' element={<Game />} />
      </Routes>


    </>

  )
}

export default App
