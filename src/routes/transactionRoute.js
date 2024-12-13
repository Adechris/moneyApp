import express from 'express';
import { sendMoney, getTransactions } from "../../controllers/transactionController.js";
import { authenticateToken } from '../utils/authMiddleWare.js';

const router = express.Router();

router.post('/send', authenticateToken, sendMoney);
router.get('/', authenticateToken, getTransactions);

export default router;
