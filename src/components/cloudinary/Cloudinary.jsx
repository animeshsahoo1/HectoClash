import React, { useEffect, useState } from 'react';
import './Cloudinary.css';
import { assets } from '../../assets';
import { auth, db } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

function Cloudinary() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [user, setUser] = useState(null);         // Firebase Auth user
  const [userData, setUserData] = useState(null); // Firestore user doc
  const [userId, setUserId] = useState('');       // Firestore user doc ID

  // Resize the profile preview box to stay square
  useEffect(() => {
    const pfp_square = () => {
      const container = document.getElementById('pfp_preview_container');
      if (container) {
        const height = container.offsetHeight;
        container.style.width = `${height}px`;
      }
    };

    pfp_square();
    window.addEventListener('resize', pfp_square);
    return () => window.removeEventListener('resize', pfp_square);
  }, []);

  // Detect auth state and fetch user data from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.email);
      }
    });

    return () => unsubscribe();
  }, []);

  // Get user Firestore data
  const fetchUserData = async (email) => {
    try {
      const userCol = collection(db, 'users');
      const q = query(userCol, where('email', '==', email));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      if (docs.length > 0) {
        setUserId(docs[0].id);
        setUserData(docs[0]); // contains profilePic
      }
    } catch (err) {
      console.error('Error fetching user data:', err.message);
    }
  };

  // Upload file to Cloudinary
  const handleUpload = async () => {
    if (!uploadedFile || !userId) {
      console.error('Missing file or user ID');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('upload_preset', 'unsigned_preset'); // Your preset

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dc6s9ukwl/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.secure_url;

      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { profilePic: imageUrl });

      setUserData(prev => ({ ...prev, profilePic: imageUrl }));
      alert('Profile picture updated!');
    } catch (err) {
      console.error('Upload error:', err.message);
    }
  };

  return (
    <div id='overallbg'>
      <div id="pfp_change">
        <div id="pfp_preview_container">
          <img
            id="pfp_preview"
            alt="Profile"
            src={userData?.profilePic || assets.profile}
          />
        </div>

        <span id="upload_new_pfp">
          <label htmlFor="file_upload" id="upload_text">Upload</label>
          <input
            type="file"
            id="file_upload"
            accept=".png, .jpg, .jpeg"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setUploadedFile(file);
                const objectURL = URL.createObjectURL(file);
                document.getElementById('pfp_preview').src = objectURL;
              }
            }}
          />
        </span>

        <button
          id="new_pfp_save"
          onClick={handleUpload}
          disabled={!uploadedFile}
          className={`save-btn ${uploadedFile ? 'enabled' : 'disabled'}`}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Cloudinary;
