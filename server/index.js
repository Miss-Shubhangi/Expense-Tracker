import express from 'express';
import mongoose from 'mongoose';
import { postSignup, postLogin } from './controllers/user.js';
import { postTransaction, getTransactions } from './controllers/transaction.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connected 🎁🔗');
  } catch (error) {
    console.error('Database connection failed ⛓️‍💥❌', error);
  }
};
dbConnection();

app.post('/signup', postSignup);
app.post('/login', postLogin);
app.post('/transaction', postTransaction);
app.get('/transactions', getTransactions);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
