class AppError  {
    constructor(message, statusCode) {
        this.statusCode = statusCode;
        this.message = message;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
    }
}
module.exports = AppError;
