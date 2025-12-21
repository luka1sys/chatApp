// mongoose ბიბლიოთეკის შემოტანა (MongoDB-სთან სამუშაოდ)
const mongoose = require('mongoose');

// Message schema-ის აღწერა
const messageSchema = new mongoose.Schema(
  {
    // რომელ ჩატს ეკუთვნის ეს მესიჯი
    chat: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
      ref: 'Chat',                          // დაკავშირებულია Chat მოდელთან
      required: true                        // აუცილებელია
    },

    // ვინ გაგზავნა მესიჯი
    sender: {
      type: mongoose.Schema.Types.ObjectId, // User-ის ID
      ref: 'User',                          // დაკავშირებულია User მოდელთან
      required: true
    },

    // თვითონ ტექსტი
    text: {
      type: String,     // ტიპი string
      required: true,   // ცარიელი ვერ იქნება
      trim: true        // ზედმეტ space-ებს ჭრის
    }
  },
  {
    timestamps: true // ავტომატურად ამატებს createdAt და updatedAt ველებს
  }
);

// schema-დან ვქმნით model-ს და ვაქსპორტებთ
const Message = mongoose.model('Message', messageSchema, "messages");
module.exports = Message;