// class AppError {
//     constructor(message, statusCode, statusText) {
//         this.message = message
//         this.statusCode = statusCode;
//         this.statusText = statusText;
//     }
// }
//  export default AppError;



function appError(message, statusCode, statusText) {
    const error = new Error();
    error.message = message
    error.statusCode = statusCode
    error.statusText = statusText
    return error
}

export default appError