
class CustomHandledError extends Error {
    constructor(message, isUserError, code) {
        super();
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;

        this.message = message;
        this.isUserError = isUserError;
        this.code = code;
        // backwards compability - result will ofcourse be false
        this.result = false;
    }
}

class CustomHandledGenericServerError extends CustomHandledError {
    constructor(message, isUserError, code) {
        super(message || 'Sorry, we are having an internal problem. Our staff has been notified about it. Please try again later.', isUserError || false, code || 500);
    }
}

exports.CustomHandledGenericServerError = CustomHandledGenericServerError;
exports.CustomHandledError = CustomHandledError;
