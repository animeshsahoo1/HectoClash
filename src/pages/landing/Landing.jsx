import React, { useState } from 'react'
import './Landing.css'
import { assets } from '../../assets'
import Login from '../../components/login/Login';
const Landing = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleLogin = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="app-container" >
            {isOpen && <Login />}
            <img src={assets.Logo} alt="Loading..." id="logo" />
            <img src={assets.symbols} alt="Loading..." id="symbols" />
            <img src={assets.blackboard} alt="Loading..." id="blackboard" />
            <span id='text_01' className='text_01'>6 Digits, 1 Goal</span>
            <span id='text_02'><i>Challenge your Brain with</i></span>
            <span id='text_03' className='text_01'>Hecktock puzzles</span>

            <button className="btn" id="big-register-btn" onClick={toggleLogin} >Sign up / Login</button>
        </div >
    )
}

export default Landing
