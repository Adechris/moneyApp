 




import { createTransaction, getTransactionsByUserId } from '../src/models/transaction.js';
import axios from 'axios';
import qs from 'qs';

export const sendMoney = async (req, res) => {
  const { amount, recipientAccountNumber, recipientAccountName, bankCode, bankName, narration, reference } = req.body;
  const userId = req.user.id;

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
        'Authorization': `Bearer ${process.env.RAVEN_API_KEY}`
      },
      data
    };

    const response = await axios(config);

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
  try {
    const transactions = await getTransactionsByUserId(userId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


 