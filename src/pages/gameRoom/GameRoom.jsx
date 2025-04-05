import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './GameRoom.css'
import Timer from '../../components/timer/Timer'

const GameRoom = () => {
    const [input, setInput] = useState("");
    const handleOnChange = (e) => {
        setInput(e.target.value);
    };
    return (
        <div>
            <Navbar />
            <Timer />
            <div className="container3">
                <h2 className="join-title">
                    <span>Six Numbers are:</span> <br />
                </h2>
                <span id='numbers'>1 2 3 4 5 6</span> <br />

                <div className="room-container">
                    <input
                        type="text"
                        className="room-input"
                        value={input}
                        onChange={handleOnChange}
                        placeholder="Enter answer"
                    />
                    <button id="skip-btn">Skip</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button id="submit-btn"><i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>

        </div>
    )
}

export default GameRoom
