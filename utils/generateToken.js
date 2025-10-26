import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return token
}


export {
    generateToken
}