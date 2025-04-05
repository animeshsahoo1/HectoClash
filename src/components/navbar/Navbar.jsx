import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const Navigate = useNavigate()
    const loggedUserId = localStorage.getItem('loggedUserId');
    // Reference the user's document in Firestore
    const userDocRef = doc(db, "users", loggedUserId);
    const [name, setName] = useState("")
    getDoc(userDocRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const userName = userData.name;
                setName(userName);

            } else {
                console.error("No document found for the logged user.");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });

    return (
        <div className='nav-container'>
            <header>

                <img src={assets.Logo} className="logo" onClick={() => { Navigate('/home') }} />

                {loggedUserId && <div className="profile">
                    <img src={assets.profile} className="profile-img" />
                    <div className="name-rating">
                        {name && <p>{`${name}`}</p>}
                        <p>Rating: 1600</p>
                    </div>
                </div>}
            </header>
        </div>
    )
}

export default Navbar