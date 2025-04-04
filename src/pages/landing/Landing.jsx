import React from 'react'
import './Landing.css'
import { assets } from '../../assets'
const Landing = () => {
  return (
    <div className="app-container" >
      <img src={assets.Logo} alt="Loading..." id="logo"/>
      <img src={assets.symbols} alt="Loading..." id="symbols"/>

       <div class="home-btn">
          <button class="btn" id="big-register-btn">Sign up / Login</button>
        </div>
    </div>
  )
}

export default Landing
