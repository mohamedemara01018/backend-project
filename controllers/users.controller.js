import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { usersModel } from "../modules/users.module.js";
import appError from "../utils/appError.js";
import { generateToken } from "../utils/generateToken.js";
import { httpStatusText } from "../utils/statusValue.js";
import bcrypt from 'bcrypt'

const getAllUsers = asyncWrapper(async (req, res, next) => {
    const users = await usersModel.find({}, { __v: 0 });
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } })
})


const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body

    if (!email && !password) {
        const fail = appError('you must provide email and password', 404, httpStatusText.FAIL);
        return next(fail)
    }
    else if (!password) {
        const fail = appError('you must provide password', 404, httpStatusText.FAIL);
        return next(fail)
    }
    else if (!email) {
        const fail = appError('you must provide email', 404, httpStatusText.FAIL);
        return next(fail)
    }


    const user = await usersModel.findOne({ email: email });
    // console.log(user)
    if (!user) {
        const fail = appError('you must register first', 404, httpStatusText.ERROR);
        return next(fail)
    }
    const token = generateToken({ email: user.email, id: user._id, role: user.role });
    return res.status(201).json({ status: httpStatusText.SUCCESS, data: { token } })
})


const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;
    console.log(req.body);
    const user = await usersModel.findOne({ email: email });
    if (user) {
        const fail = appError('user already exists, go to login', 401, httpStatusText.FAIL);
        return next(fail)
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new usersModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        avatar:req.file.filename
    })
    await newUser.save();

    const token = generateToken({ email, id: newUser._id, role: newUser.role })
    newUser.token = token;

    return res.status(201).json({ status: httpStatusText.SUCCESS, data: { newUser } })
})


export {
    getAllUsers,
    login,
    register,
}
