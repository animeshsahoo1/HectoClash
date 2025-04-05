import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = ({ duration = 60, onEnd }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset = circumference * (1 - timeLeft / duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onEnd) onEnd();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, onEnd]);

    return (
        <div className="timer-container">
            <svg className="timer-svg" width="120" height="120" viewBox="0 0 120 120">
                <circle
                    className="timer-circle timer-circle-bg"
                    cx="60"
                    cy="60"
                    r={radius}
                />
                <circle
                    className={`timer-circle timer-circle-progress ${timeLeft <= 10 ? 'danger' : ''}`}
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                />
            </svg>
            <div className="timer-content">
                <div className="timer-number">{timeLeft}</div>
                <div className="timer-label">sec</div>
            </div>
        </div>
    );
};

export default Timer;
