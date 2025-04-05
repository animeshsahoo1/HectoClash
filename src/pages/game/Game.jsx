import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { realtimeDB } from '../../../firebase';
import { ref, set, get, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

import './Game.css';

const Game = () => {
    const loggedUserId = localStorage.getItem('loggedUserId');
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        setRoomId(e.target.value);
    };

    const handleOnSubmit = async () => {
        if (!roomId || !loggedUserId) {
            alert("Please enter a valid Room ID and make sure you're logged in.");
            return;
        }

        try {
            const roomRef = ref(realtimeDB, `rooms/${roomId}`);
            const snapshot = await get(roomRef);

            if (!snapshot.exists()) {
                alert("Room does not exist.");
                return;
            }

            const data = snapshot.val();
            const users = data.users || [];

            // Add the user only if not already in the room
            if (!users.includes(loggedUserId)) {
                const updatedUsers = [...users, loggedUserId];
                await update(roomRef, { users: updatedUsers });
                alert("Successfully joined the room!");
            } else {
                alert("You are already in this room.");
            }

        } catch (error) {
            console.error("Error joining room:", error);
            alert("Failed to join room.");
        }
    };


    const handleCreateRoom = async () => {
        try {
            // Create a room with the loggedUserId as roomId, and initial user array
            await set(ref(realtimeDB, `rooms/${loggedUserId}`), {
                users: [loggedUserId]
            });
            alert("Room created successfully!");
        } catch (error) {
            console.error("Error creating room:", error);
            alert("Failed to create room.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container2">
                <h2 className="join-title">
                    <span>Join a game:</span> Enter the Game ID to join a room.<br />
                    <span>Or start your own:</span> Create a new room and invite others!
                </h2>

                <div className="room-container">
                    <input
                        type="text"
                        className="room-input"
                        placeholder="Enter Room Code"
                        value={roomId}
                        onChange={handleOnChange}
                    />
                    <button className="create-room-btn" onClick={handleCreateRoom}>Create Room</button>
                    <button className="join-friend-btn" onClick={handleOnSubmit}>Join Friend</button>
                </div>
            </div>
        </div>
    );
};

export default Game;
