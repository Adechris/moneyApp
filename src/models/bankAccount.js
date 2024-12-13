 
import db from "../../config/db.js";

export const createBankAccount = async (userId, accountNumber) => {
  return await db('bank_accounts').insert({ user_id: userId, account_number: accountNumber });
};

export const findBankAccountByUserId = async (userId) => {
  return await db('bank_accounts').where({ user_id: userId }).first();
};

export const updateBankAccountBalance = async (accountId, balance) => {
  return await db('bank_accounts').where({ id: accountId }).update({ balance }) ;
};
