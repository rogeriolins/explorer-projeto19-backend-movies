class AppError {
    // This Class need express-async-errors
    constructor( message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
module.exports = AppError;