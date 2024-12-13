 
import db from '../../config/db.js';

export const createTransaction = async (userId, type, amount, status) => {
  return await db('transactions').insert({ user_id: userId, type, amount, status });
};

export const getTransactionsByUserId = async (userId) => {
  return await db('transactions').where({ user_id: userId });
};
