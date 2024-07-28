const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /transactions
router.post('/', async (req, res) => {
    try {
        const { date, amount, payee, categoryId, userId } = req.body;

        if (!date || !amount || !payee || !categoryId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newTransaction = await prisma.transaction.create({
            data: {
                date: new Date(date),
                amount: parseInt(amount, 10),
                payee,
                categoryId,
                userId,
            },
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /transactions
router.get('/', async (req, res) => {
    try {
        const { userId, categoryId, transactionId } = req.query;

        const query = {};
        if (userId) query.userId = parseInt(userId, 10);
        if (categoryId) query.categoryId = parseInt(categoryId, 10);
        if (transactionId) query.id = parseInt(transactionId, 10);

        const transactions = await prisma.transaction.findMany({
            where: query,
            include: {
                category: true,  // Include category details if needed
                user: true,      // Include user details if needed
            },
        });

        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;