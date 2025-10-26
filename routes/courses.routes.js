import express from 'express'
import { getAllCourses, createNewCourse, getCourseById, deleteAllCourses } from '../controllers/courses.controller.js';
import { verifyUser } from '../middlewares/verifyUser.middleware.js';
import { allowedTo } from '../middlewares/allowedTo.js';
import { userRoles } from '../utils/userRoles.js';

const router = express.Router();

// router.get('/courses', getAllCourses);
// router.post('/courses', getAllCourses);

router.route('/')
    .get(getAllCourses)
    .post(verifyUser, allowedTo(userRoles.MANAGER, userRoles.ADMIN), createNewCourse)
    .delete(verifyUser, deleteAllCourses)

router.route('/:id')
    .get(getCourseById)


export default router   