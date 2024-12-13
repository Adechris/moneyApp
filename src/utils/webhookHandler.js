// utils/webhookHandler.js
import { updateBankAccountBalance } from '../models/bankAccount.js';
import { createTransaction } from '../models/transaction.js';

export const handleWebhook = async (req, res) => {
  const { event, data } = req.body;
  if (event === 'deposit.success') {
    const { account_id, amount } = data;
    try {
      const bankAccount = await updateBankAccountBalance(account_id, amount);
      await createTransaction(bankAccount.user_id, 'deposit', amount, 'success');
      res.status(200).json({ message: 'Webhook received' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Invalid event' });
  }
};
