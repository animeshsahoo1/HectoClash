import './App.css'
import { assets } from './assets'
import Navbar from './components/navbar/Navbar'
import Landing from './pages/landing/landing'


function App() {
  const loggedUserId=localStorage.getItem('loggedUserId');
  return (
    <>
      {loggedUserId && <Navbar/>}
      <Landing/>
      
    </>
    
  )
}

export default App
