const express = require('express');
const { createChat, getChats, addMember } = require('../controllers/chat.controller');
const { protect } = require('../middlewares/auth.middlewares');


const chatRouter = express.Router();

// ყველა route უნდა იყოს დაცული


chatRouter.post('/', protect, createChat);
// FIXED: Added protect middleware to prevent unauthorized access to all chats
chatRouter.get('/', protect, getChats);

chatRouter.patch('/:id/add-member', protect, addMember);

module.exports = chatRouter;