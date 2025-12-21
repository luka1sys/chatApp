const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");




const sendMessage = catchAsync(async (req, res, next) => {
    // body-დან ვიღებთ ჩატის ID-ს და მესიჯის ტექსტს
    const { chatId, text } = req.body;
    // ვამოწმებთ აუცილებელ ველებს
    if (!chatId || !text) {
        return next(new AppError('chatId and text are required', 400));
    }
    // ვპოულობთ ჩატს მონაცემთა ბაზაში
    const chat = await Chat.findById(chatId);

    if (!chat) {
        return next(new AppError('Chat not found', 404));

    }

    // ვამოწმებთ არის თუ არა current user ამ ჩატის წევრი
    const isMember = chat.members.some(memberId => memberId.toString() === req.user._id.toString());

    if (!isMember) {
        return next(new AppError('You are not a member of this chat', 403));
    }


    // ვქმნით მესიჯს DB-ში
    const message = await Message.create({
        chat: chatId,
        sender: req.user._id,
        text
    });

    // IMPORTANT: Populate sender info before sending response
    // This ensures frontend receives sender.fullname without errors
    await message.populate('sender', 'fullname email');

    // Emit message to all connected clients via Socket.IO for real-time updates
    // req.io is the Socket.IO instance attached in server.js
    if (req.io) {
        req.io.to(chatId).emit('newMessage', message);
    }

    res.status(201).json({
        status: 'success',
        message
    });
})

const getMessages = catchAsync(async (req, res, next) => {

    // URL parameter-დან ვიღებთ chatId-ს
    const { chatId } = req.params;

    // ვპოულობთ ჩატს
    const chat = await Chat.findById(chatId);

    // თუ ჩატი არ არსებობს
    if (!chat) {
        return next(new AppError('Chat not found', 404));
    }

    // ვამოწმებთ არის თუ არა user ამ ჩატის წევრი
    const isMember = chat.members.some(
        memberId => memberId.toString() === req.user._id.toString()
    );

    // თუ არა — აკრძალულია
    if (!isMember) {
        return next(new AppError('Access denied', 403));
    }

    // ვპოულობთ ყველა მესიჯს ამ ჩატისთვის
    const messages = await  Message.find({ chat: chatId })
        .populate('sender', 'fullname email') // sender-ის fullname და email
        .sort({ createdAt: 1 });              // ძველიდან ახალისკენ

    // წარმატებული პასუხი
    res.status(200).json({
        status: 'success',
        messages
    });
});

module.exports = { sendMessage, getMessages };


