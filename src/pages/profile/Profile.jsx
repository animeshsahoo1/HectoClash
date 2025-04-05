import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import { assets } from '../../assets';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Cloudinary from '../../components/cloudinary/Cloudinary';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleCloudinary = () => {
        setIsOpen(!isOpen);
    };


    const loggedUserId = localStorage.getItem('loggedUserId');
    const navigate = useNavigate();
    const handleBox1Click = () => {
        navigate('/games');
    };

    // Reference the user's document in Firestore
    const userDocRef = doc(db, "users", loggedUserId);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [rating, setRating] = useState("")
    const [profilePic, setProfilePic] = useState("")

    getDoc(userDocRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const userName = userData.name;
                const userEmail = userData.email;
                const userCountry = userData.country;
                const userRating = userData.rating;
                const userProfilePic = userData.profilePic;
                setName(userName);
                setEmail(userEmail);
                setCountry(userCountry);
                setRating(userRating);
                setProfilePic(userProfilePic);

            } else {
                console.error("No document found for the logged user.");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });

    function logout() {
        localStorage.removeItem('loggedUserId');
        navigate("/");
    }
    function profile() {
        navigate("/profile");
    }


    return (
        <div >
            {isOpen && <Cloudinary />}
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
                    <div id="profile-card">

                        <img src={profilePic || `${assets.profile}`} alt="Loading..." id='profile-picture' />
                        <button id='edit-pfp' onClick={toggleCloudinary}><i class="fa-solid fa-pencil"></i></button>
                        <div id="username">{name}</div>
                        <div id="country"><i class="fa-solid fa-globe"></i> {country}</div>
                        <div id="email-address">{email}</div>
                        <div id="rating">Rating: <span>{rating}</span></div>

                    </div>
                </div>

                <div className="item" id='item_03'></div>
            </div>
        </div>
    )

}

export default Profile