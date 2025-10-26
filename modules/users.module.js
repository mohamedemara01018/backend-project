import mongoose from "mongoose";
import { userRoles } from "../utils/userRoles.js";


const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'you must provide your first name']
    },
    lastName: {
        type: String,
        required: [true, 'you must provide your last ame']
    },
    email: {
        type: String,
        required: [true, 'you must provide your first name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'you must provide your  password']
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: [userRoles.ADMIN, userRoles.USER, userRoles.MANAGER],
        default: userRoles.USER
    },
    avatar: {
        type: String,
    }
})


export const usersModel = mongoose.model('Users', usersSchema)