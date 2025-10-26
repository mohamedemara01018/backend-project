import appError from "../utils/appError.js";
import { httpStatusText } from "../utils/statusValue.js";

export const allowedTo = (...roles) => {

    return (req, res, next) => {
        console.log('role', req.currentUser.role)
        if (!roles.includes(req.currentUser.role)) {
            const error = appError("you don't authorized to make this action", 401, httpStatusText.ERROR)
            return next(error);
        }
        next();
    }
}