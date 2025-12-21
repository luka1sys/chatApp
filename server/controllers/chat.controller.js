const Chat = require("../models/chat.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");




const createChat = catchAsync(async (req, res, next) => {
    const { title, members } = req.body;
    const createdBy = req.user._id;

    if (!title) {
        return next(new AppError('Title is required to create a chat', 400));
    }

    // members აუცილებლად უნდა იყოს array
    let finalMembers = Array.isArray(members) ? members : [];

    // ავტომატურად ვამატებთ ჩატის შემქმნელს
    if (!finalMembers.includes(createdBy.toString())) {
        finalMembers.push(createdBy);
    }

    const chat = await Chat.create({ title, members: finalMembers, createdBy });

    res.status(201).json({
        status: 'success',
        chat
    });
});



const getChats = catchAsync(async (req, res, next) => {
    const userId = req.query.userId;

    let chats;
    if (userId) {
        // ვიღებთ ჩატებს, სადაც user არის member
        chats = await Chat.find({ members: userId }).populate('members', 'fullname email');
    } else {
        chats = await Chat.find().populate('members', 'fullname email');
    }

    res.status(200).json({
        status: 'success',
        chats
    });
});

const addMember = catchAsync(async (req, res, next) => {

    // ვპოულობთ ჩატს მისი ID-ით (URL parameter-დან)
    const chat = await Chat.findById(req.params.id);


    // თუ ჩატი არ არსებობს, ვაბრუნებთ 404 შეცდომას
    if (!chat) {
        return next(new AppError('Chat not found', 404));
    }

    // ვიღებთ userId-ს request body-დან, რომელიც უნდა დაემატოს ჩატში
    const { userId } = req.body;
    console.log(userId);


    // თუ userId არ არის, ვაბრუნებთ 400 შეცდომას
    if (!userId) return next(new AppError('userId is required', 400));

    // თუ userId ჯერ არ არის ჩატში (დუბლიკატის თავიდან აცილება)
    if (!chat.members.includes(userId)) {

        // ვამატებთ userId-ს members array-ში
        chat.members.push(userId);

        // ვახორციელებთ ჩატის განახლებას DB-ში
        await chat.save();
    }

    // ვაბრუნებთ წარმატებულ პასუხს და ჩატ ობიექტს
    res.status(200).json({
        status: 'success',
        chat
    });
});

module.exports = { createChat, getChats, addMember };



