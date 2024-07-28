import React from 'react';
import './TransactionCard.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const TransactionCard = ({ _id, title, amount, category, type, createdAt, loadTransactions }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/transactions/${_id}`);
      toast.success('Transaction deleted successfully');
      loadTransactions();
    } catch (error) {
      toast.error('Failed to delete transaction');
    }
  };

  return (
    <div className='transaction-card'>
      <div className='transaction-details'>
        <h3>{title}</h3>
        <p className='transaction-date'>Date: {new Date(createdAt).toLocaleDateString()}
        <p className={type === 'Credit' ? 'credit' : 'debit'}>
          {type === 'Credit' ? `+₹${amount}` : `-₹${amount}`}
        </p>
        </p>
       
      </div>
      <p>Category: {category}</p>
      <div className='transaction-amount'>
       
      </div>
      <button className='delete-button' onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TransactionCard;
