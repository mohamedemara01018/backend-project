import express from 'express';
import { getAllUsers, login, register } from '../controllers/users.controller.js';
import { verifyUser } from '../middlewares/verifyUser.middleware.js';
import multer from 'multer';
import appError from '../utils/appError.js';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        callback(null, fileName);
    }
}) 

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const imageType = file.mimetype.split('/')[0];

        if (imageType == 'image') {
            return callback(null, true);
        } else {
            return callback(null, appError('this is not an image', 400));
        }
    }
})

const router = express.Router();


router.route('/')
    .get(verifyUser, getAllUsers)


router.route('/login')
    .post(login)

router.route('/register')
    .post(upload.single('avatar'), register)


export default router