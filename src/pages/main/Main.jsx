import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import './Main.css'
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const loggedUserId = localStorage.getItem('loggedUserId');
    const navigate = useNavigate();
    const handleBox1Click = () => {
        navigate('/games');
    };


    function logout() {
        localStorage.removeItem('loggedUserId');
        navigate("/");
    }
    function profile() {
        navigate("/profile");
    }


    return (
        <div >
            {loggedUserId && <Navbar />}
            <div className="container1">
                <div className="item" id='item_01'>
                    <div id='home' className='sidebar_btn'><i className="fa-solid fa-house"></i>&nbsp;Home</div>
                    <div id='profile' className='sidebar_btn' onClick={profile}><i className="fa-solid fa-user"></i>&nbsp;Profile</div>
                    <div id='leaderboard' className='sidebar_btn'><i className="fa-solid fa-chart-simple"></i>&nbsp;Leaderboard</div>
                    <div id='friends' className='sidebar_btn'><i className="fa-solid fa-users"></i>&nbsp;Friends</div>
                    <div id='logout' onClick={logout}><i className="fa-solid fa-right-from-bracket"></i>&nbsp;Logout</div>
                </div>
                <div className="item" id='item_02'>
                    <div className="box" id='box1' onClick={handleBox1Click}>
                        <div><span className='icon_box'><i class="fa-solid fa-handshake"></i></span><br />Play with Friend</div>
                    </div>
                    <div className="box" id='box2'>
                        <div><span className='icon_box'><i class="fa-solid fa-gamepad"></i></span><br />Play Online</div>
                    </div>


                </div>
                <div className="item" id='item_03'></div>
            </div>
        </div>
    )

}

export default Main
