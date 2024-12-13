import express from 'express';
import { generateBankAccount, getBankAccount } from '../../controllers/bankController.js';
import { authenticateToken } from '../utils/authMiddleWare.js';

const router = express.Router();

router.post('/generate', authenticateToken, generateBankAccount);
router.get('/', authenticateToken, getBankAccount);

export default router;
