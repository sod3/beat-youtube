import express from 'express';
import { sendMessage } from '../controllers/contactController.js';

const router = express.Router();

// Route to handle contact form submission
router.post('/contact', sendMessage);

export default router;
