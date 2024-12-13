 




import { createTransaction, getTransactionsByUserId } from '../src/models/transaction.js';
import axios from 'axios';
import qs from 'qs';

export const sendMoney = async (req, res) => {
  const { amount, recipientAccountNumber, recipientAccountName, bankCode, bankName, narration, reference } = req.body;
  const userId = req.user.id;
  console.log('User ID:', userId);
  console.log('Amount:', amount);
  console.log('Recipient Account Number:', recipientAccountNumber);
  console.log('Recipient Account Name:', recipientAccountName);
  console.log('Bank Code:', bankCode);
  console.log('Bank Name:', bankName);
  console.log('Narration:', narration);
  console.log('Reference:', reference);

  try {
    const data = qs.stringify({
      amount,
      bank_code: bankCode,
      bank: bankName,
      account_number: recipientAccountNumber,
      account_name: recipientAccountName,
      narration,
      reference,
      currency: 'NGN'
    });

    const config = {
      method: 'post',
      url: 'https://integrations.getravenbank.com/v1/transfers/create',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${process.env.RAVEN_API_KEY}` // Ensure this key is correct
      },
      data
    };

    const response = await axios(config);

    console.log('Raven API Response:', response.data);
    if (response.data.status === 'success') {
      await createTransaction(userId, 'transfer', amount, 'success');
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ error: 'Transfer failed' });
    }
  } catch (error) {
    console.error('Error sending money:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getTransactions = async (req, res) => {
  const userId = req.user.id;
  console.log('User ID:', userId);

  try {
    const config = {
      method: 'get',
      url: 'https://integrations.getravenbank.com/v1/accounts/transactions',
      headers: {
        'Authorization': `Bearer ${process.env.RAVEN_API_KEY}` // Ensure this key is correct
      }
    };

    const response = await axios(config);
    console.log('Raven API Response:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: error.message });
  }
};

export const depositMoney = async (req, res) => {
  const { amount, reference } = req.body;
  const userId = req.user.id;
  console.log('User ID:', userId);
  console.log('Amount:', amount);
  console.log('Reference:', reference);

  try {
    const data = qs.stringify({
      amount,
      reference,
      currency: 'NGN'
    });

    const config = {
      method: 'post',
      url: 'https://integrations.getravenbank.com/v1/deposits/create',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${process.env.RAVEN_API_KEY}` // Ensure this key is correct
      },
      data
    };

    const response = await axios(config);

    console.log('Raven API Response:', response.data);
    if (response.data.status === 'success') {
      await createTransaction(userId, 'deposit', amount, 'success');
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ error: 'Deposit failed' });
    }
  } catch (error) {
    console.error('Error depositing money:', error);
    res.status(500).json({ error: error.message });
  }
};


 