import React, { useEffect, useState } from 'react';
import './Home.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import TransactionCard from './../../Components/TransactionCard/TransactionCard';
import { Link } from 'react-router-dom';


function Home() {
  const [user, setUser] = useState(null); 
  const [transactions, setTransactions] = useState([]);
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const loadTransactions = async () => {
    if (!user?._id) return; 
    toast.loading('Loading transactions...');

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`, {
        params: { userId: user._id },
      });
      const allTransactions = response.data.data;
      toast.dismiss();
      setTransactions(allTransactions);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to load transactions');
    }
  };

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'Credit') {
        income += transaction.amount;
      } else if (transaction.type === 'Debit') {
        expense += transaction.amount;
      }
    });

    setNetIncome(income);
    setNetExpense(expense);
  }, [transactions]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
  };

  return (
    <div>
      <div className="header-container">
        <p className="home-greeting">Hello {user?.fullName}</p>
        <span className="home-logout" onClick={handleLogout}>
          Logout
        </span>
      </div>
      <p className="home-heading">Welcome to Your Expense Tracker ...!</p>
      <Link to="/add-transaction" className="add-button">
        Add Transaction
      </Link>
      <div className="net-transactions-values">
        <div className="net-transactions-value-item">
          <span className="net-transactions-value-amount credit">
            + {netIncome}
          </span>
          <span className="net-transactions-value-title">Net Income</span>
        </div>
        <div className="net-transactions-value-item">
          <span className="net-transactions-value-amount debit">
            - {netExpense}
          </span>
          <span className="net-transactions-value-title">Net Expense</span>
        </div>
        <div className="net-transactions-value-item">
          <span className="net-transactions-value-amount balance">
            {netIncome - netExpense}
          </span>
          <span className="net-transactions-value-title">Net Balance</span>
        </div>
      </div>
      <div className="transactions-container">
        {transactions.map((transaction) => {
          const { _id, title, amount, category, type, createdAt } = transaction;
          return (
            <TransactionCard
              key={_id}
              _id={_id}
              title={title}
              amount={amount}
              category={category}
              type={type}
              createdAt={createdAt}
              loadTransactions={loadTransactions}
            />
          );
        })}
      </div>
      <Toaster />
      
    </div>
  );
}

export default Home;
