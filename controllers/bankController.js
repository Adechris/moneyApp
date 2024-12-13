 
import { createBankAccount, findBankAccountByUserId } from '../src/models/bankAccount.js';
 

export const generateBankAccount = async (req, res) => {
  const userId = req.user.id;

  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

  try {
    const bankAccount = await createBankAccount(userId, accountNumber);
    res.status(201).json(bankAccount);
  } catch (error) {
    console.error('Error generating bank account:', error);
    res.status(500).json({ error: error.message });
  }
};


export const getBankAccount = async (req, res) => {
  const userId = req.user.id;
  console.log('User ID:', userId);
  try {
    const bankAccount = await findBankAccountByUserId(userId);
    console.log('Bank Account:', bankAccount);
    if (bankAccount) {
      res.status(200).json(bankAccount);
    } else {
      res.status(404).json({ error: 'Bank account not found' });
    }
  } catch (error) {
    console.error('Error getting bank account:', error);
    res.status(500).json({ error: error.message });
  }
};
