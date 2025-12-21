
const jwt = require('jsonwebtoken');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require('../models/user.model');

const signToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

const createSendToken = (statusCode, res, user) => {
    const token = signToken(user);

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'Lax',
        maxAge: 3 * 24 * 60 * 60 * 1000 // 24 hours
    });

    res.status(statusCode).json(user);
}

const signup = catchAsync(async (req, res, next) => {
    const { fullname, email, password } = req.body;

    const isExsist = await User.findOne({ email });

    if (isExsist) {
        return next(new AppError('user exsists!', 401));
    }

    const user = await User.create({ fullname, email, password });

    user.password = undefined;

    res.status(201).json(user);
});

const login = catchAsync(async (req, res, next) => {
    // ვიღებთ წვდომას ემაილზე და პაროლზე 
    const { email, password } = req.body

    // ვეძებთ ემაილს user კოლექციიდან 
    const user = await User.findOne({ email }).select('+password');
    // თუ არ გვაქვს user ვაბრუნებთ ერორის მმართელ ფუნქციას 
    if (!user) {
        return next(new AppError('your email or password is incorrect', 404))
    }
    if (!user.isVerified) {
        return next(new AppError('Please verify your email before logging in', 401));
    }
    // ვადარებთ შეყვანილ პაროლს (password) და ბაზაში შენახულ ჰეშირებულ პაროლს (user.password)
    // comparePassword არის user მოდელში განსაზღვრული მეთოდი, რომელიც bcrypt-ს ანალოგიურად ადარებს
    const iscorrect = await user.comparePassword(password, user.password);
    // თუ პაროლი არ ემთხვევა, ვაბრუნებთ შეცდომას
    if (!iscorrect) {
        return next(new AppError('your email or password is incorrect', 404))
    }
    // თუ email და password სწორია, ვაბრუნებთ წარმატებულ პასუხს (200)
    // response-ში ვაგზავნით iscorrect ცვლადს და user ობიექტს
    createSendToken(200, res, user);

})


const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find().select("_id fullname email"); // მხოლოდ საჭირო ველი
    res.status(200).json({
        status: "success",
        users,
    });

  
});






module.exports = { signup, login, getAllUsers };