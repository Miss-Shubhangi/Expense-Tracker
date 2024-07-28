import React, { useState, useEffect } from 'react';
import './AddTransaction.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const AddTransaction = () => {
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('Credit');
  const [category, setCategory] = useState('groceries');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      setUser(currentUser);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const addTransaction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/transactions`, {
        title,
        amount,
        type,
        category,
        user: user._id
      });

      toast.success(response.data.message);

      setTitle('');
      setAmount(0);
      setType('Credit');
      setCategory('groceries');

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      toast.error('Failed to add transaction');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h3>Add Transaction For {user.fullName}</h3>
        <form onSubmit={addTransaction}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
          <select
            id="expense-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="groceries">Groceries</option>
            <option value="utilities">Utilities</option>
            <option value="rent-mortgage">Rent/Mortgage</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddTransaction;
