import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './GameRoom.css';
import Timer from '../../components/timer/Timer';
import { realtimeDB, db } from '../../../firebase';
import { ref, get, set, remove } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


const GameRoom = () => {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [input, setInput] = useState("");
    const [questions, setQuestions] = useState([123456, 789012, 345678]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const loggedUserId = localStorage.getItem('loggedUserId');
    const userDataRef = ref(realtimeDB, `rooms/${gameId}/userData/${loggedUserId}`);

    const handleOnChange = (e) => {
        setInput(e.target.value);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [scores, setScores] = useState({});

    const handleGameEnd = async () => {

        try {
            const userDataRef = ref(realtimeDB, `rooms/${gameId}/userData`);
            const snapshot = await get(userDataRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                setScores(data);
                setShowPopup(true);

                const myScore = data[loggedUserId]?.points || 0;

                // Get opponent
                const opponentEntry = Object.entries(data).find(([id]) => id !== loggedUserId);
                const opponentScore = opponentEntry?.[1]?.points || 0;

                let result = "tie";
                if (myScore > opponentScore) result = "win";
                else if (myScore < opponentScore) result = "lose";

                // Push to logged-in user's Firestore history
                const userDocRef = doc(db, "users", loggedUserId);
                const userSnap = await getDoc(userDocRef);
                const userData = userSnap.data();
                const history = userData?.history || [];

                const alreadyExists = history.some((entry) => entry.roomId === gameId);
                if (!alreadyExists) {
                    const newEntry = {
                        roomId: gameId,
                        score: myScore,
                        opponentScore: opponentScore,
                        result: result,
                        timestamp: new Date().toISOString()
                    };

                    await updateDoc(userDocRef, {
                        history: [...history, newEntry]
                    });
                }
            }
        } catch (err) {
            console.error("Error fetching scores or updating history:", err);
        }
    };



    async function checkAnswer() {
        try {
            const answer = eval(input);
            if (answer === 100) {
                if (currentIndex < questions.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                }

                const snapshot = await get(userDataRef);
                const currentPoints = snapshot.exists() ? (snapshot.val().points || 0) : 0;
                await set(userDataRef, {
                    points: currentPoints + 20
                });

                setInput("");
            } else {
                alert("Incorrect! Try again.");
            }
        } catch (err) {
            alert("Invalid expression");
        }
    }

    const handleSkip = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            alert("No more questions to skip.");
        }
        setInput(""); // clear input on skip
    };

    return (
        <div>
            <Navbar />
            <div className="timer-area">
                <Timer duration={10} onEnd={handleGameEnd} />
            </div>
            <div className="container3">
                <h2 className="join-title">
                    <span>Six Numbers are:</span> <br />
                </h2>
                <span id='numbers'>
                    {questions[currentIndex].toString().split('').join(' ')}
                </span> <br />

                <div className="room-container">
                    <input
                        type="text"
                        className="room-input"
                        value={input}
                        onChange={handleOnChange}
                        placeholder="Enter expression"
                    />
                    <button id="skip-btn" onClick={handleSkip}>Skip</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button id="submit-btn" onClick={checkAnswer}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <span className='game-over'>Game Over!</span>
                        <span className='you-points'><strong>You:</strong> {scores[loggedUserId]?.points || 0} points</span>
                        <span className='opp-points'><strong>Opponent:</strong> {
                            Object.entries(scores).filter(([id]) => id !== loggedUserId)[0]?.[1].points || 0
                        } points</span>
                        <span className='result-font'>
                            {
                                (() => {
                                    const myScore = scores[loggedUserId]?.points || 0;
                                    const opponent = Object.entries(scores).filter(([id]) => id !== loggedUserId)[0];
                                    const opponentScore = opponent?.[1].points || 0;

                                    if (myScore > opponentScore) return "🏆 You won!";
                                    if (myScore < opponentScore) return "😢 You lost.";
                                    return "🤝 It's a tie!";
                                })()
                            }
                        </span>
                        <br /><br />
                        <button
                            onClick={async () => {
                                try {
                                    await remove(ref(realtimeDB, `rooms/${gameId}`));
                                } catch (err) {
                                    console.error("Error removing room:", err);
                                }
                                navigate('/home');
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default GameRoom;
