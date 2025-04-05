import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { realtimeDB } from '../../../firebase';
import { ref, set, get, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './Game.css';

const Game = () => {
    function generateRoomCode() {
        return Math.floor(Math.random() * (100000 - 10000)) + 10000;
    }
    const loggedUserId = localStorage.getItem('loggedUserId');
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();
    // const usersRef = get()

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

            if (!users.includes(loggedUserId)) {
                const updatedUsers = [...users, loggedUserId];
                await update(roomRef, { users: updatedUsers });
                alert("Successfully joined the room!");
            } else {
                alert("You are already in this room.");
            }

            navigate(`/games/${roomId}`);
        } catch (error) {
            console.error("Error joining room:", error);
            alert("Failed to join room.");
        }
    };

    const handleCreateRoom = async () => {
        if (!loggedUserId) {
            alert("User not logged in.");
            return;
        }
    
        try {
            const uniqueId = generateRoomCode();
            await set(ref(realtimeDB, `rooms/${uniqueId}`), {
                users: [loggedUserId],
                createdAt: Date.now()
            });
            alert(`Room created successfully!, RoomId:${uniqueId}`);
            navigate(`/games/${uniqueId}`);
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
                    <button className="join-friend-btn" onClick={handleOnSubmit}>Join Friend</button>
                    <button className="create-room-btn" onClick={handleCreateRoom}>Create Room</button>
                </div>
            </div>
        </div>
    );
};

export default Game;
