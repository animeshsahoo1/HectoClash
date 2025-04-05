import React, { useState } from "react";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showContainer, setShowContainer] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Show Message
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  };

  // Close Form
  const handleClose = () => {
    setShowContainer(false);
    setFormData({
      name: "",
      country: "",
      email: "",
      password: "",
    });
    setMessage("");
  };

  // Sign Up Function
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { email, password, name, country } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), { email, name, country });
      localStorage.setItem("loggedUserId", user.uid);

      showMessage("Account Created, Redirecting...");
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        showMessage("Email already exists");
      } else {
        showMessage("Unable to create user");
      }
    }
  };

  // Sign In Function
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("loggedUserId", userCredential.user.uid);

      showMessage("Login successful, Redirecting...");
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        showMessage("Incorrect password");
      } else if (error.code === "auth/user-not-found") {
        showMessage("Account does not exist");
      } else {
        showMessage("Unable to log in");
      }
    }
  };

  return (
    <div className="auth" style={{ display: showContainer ? "block" : "none" }}>
      {/* Sign Up Form */}
      <div
        className="container"
        style={{ display: showContainer && isSignUp ? "block" : "none" }}
      >
        <h2 className="close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </h2>

        <h1 className="form-title">Register</h1>
        {message && <div className="messageDiv">{message}</div>}
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="writing"
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-group">
            <i className="fas fa-globe"></i>
            <input
              type="text"
              name="country"
              placeholder="Country"
              required
              className="writing"
              onChange={handleChange}
            />
            <label htmlFor="country">Country</label>
          </div>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="writing"
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="writing"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <input type="submit" className="btn" value="Sign Up" />
        </form>

        <div className="links">
          <p>Already have an account?</p>
          <button onClick={() => setIsSignUp(false)}>Sign In</button>
        </div>
      </div>

      {/* Sign In Form */}
      <div
        className="container"
        style={{ display: showContainer && !isSignUp ? "block" : "none" }}
      >
        <h2 className="close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </h2>

        <h1 className="form-title">Sign In</h1>
        {message && <div className="messageDiv">{message}</div>}
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="writing"
              onChange={handleChange}
            />
            <label htmlFor="signInEmail">Email</label>
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="writing"
              onChange={handleChange}
            />
            <label htmlFor="signInpassword">Password</label>
          </div>
          <input type="submit" className="btn" value="Sign In" />
        </form>

        <div className="links">
          <p>Don't have an account?</p>
          <button onClick={() => setIsSignUp(true)}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
