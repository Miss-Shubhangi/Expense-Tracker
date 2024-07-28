import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './SignUp.css';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: ''
  });

  const signUP = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        dob: user.dob
      });

      if (response.data.success) {
        toast.success(response.data.message);

        setUser({
          fullName: '',
          email: '',
          password: '',
          dob: ''
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={signUP}> 
        <h2>Create Account</h2>
        <input 
          type="text" 
          name="fullName" 
          placeholder="Full Name" 
          value={user.fullName} 
          onChange={(e) => setUser({ ...user, fullName: e.target.value })} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={user.email} 
          onChange={(e) => setUser({ ...user, email: e.target.value })} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={user.password} 
          onChange={(e) => setUser({ ...user, password: e.target.value })} 
          required 
        />
        <input 
          type="date" 
          name="dob" 
          value={user.dob} 
          onChange={(e) => setUser({ ...user, dob: e.target.value })} 
          required 
        />
        <button type="submit">Sign Up</button>
        <p>Have already an account? <a href="/login">Login here</a></p>
      </form>
      <Toaster />
    </div>
  );
};

export default Signup;
