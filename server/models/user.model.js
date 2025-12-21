const mongoose = require('mongoose');

const bcrypt = require('bcrypt')


// მოდელის სქემა
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        select: false


    },
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        default: "user",

    },
    isVerified: { // email-ვერიფიკაციისთვის
        type: Boolean,
        default: false
    },
    verifycationCode: String,
    emailVerificationExpires: Date,  // email ვერიფიკაციის კოდი
    // მომხემარებლის პროფილის აქტიურობა
    isAcyive: {

        type: Boolean,
        default: true
    },


}, {
    // როდის მოხდა შექმნა 
    timestamps: true
})
// პაროლის ჰეშირება 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  
    this.password = await bcrypt.hash(this.password, 10);
});
// ვადარებთ ახლა შემოყვანილ პაროლსა  და ბაზაში არსებულ პაროლს და აქ დაგვიბრუნდება ture ან false 
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}


// ვქმნით სქემას 
const User = mongoose.model('User', userSchema, 'users')
module.exports = User