import jwt from 'jsonwebtoken'
import appError from '../utils/appError.js';
import { httpStatusText } from '../utils/statusValue.js';

const verifyUser = async (req, res, next) => {
    const authorization = req.headers.Authorization || req.headers.authorization;
    if (!authorization) {
        const error = appError('token not provide', 401, httpStatusText.ERROR);
        return next(error)
    }
    const token = authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = decodedToken
    console.log(decodedToken)
    if (decodedToken) {
        next();
    } else {
        const fail = appError('token is not correct', 404, httpStatusText.FAIL);
        return next(fail);
    }
}


export {
    verifyUser
}