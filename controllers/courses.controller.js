import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { courseModel } from "../modules/courses.module.js";
import appError from "../utils/appError.js";
import { httpStatusText } from "../utils/statusValue.js";


//get all course

const getAllCourses = asyncWrapper(
    async (req, res) => {
        const courses = await courseModel.find({}, { __v: 0 });
        if (!courses) {
            const fail = appError('courses not found', 404, httpStatusText.FAIL)
            return next(fail)
        }
        return res.status(200).json({ status: 'success', data: { courses } })
    }
)

const getCourseById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const course = await courseModel.findById(id, { __v: 0 });

    if (!course) {
        const error = appError('not found', 404, httpStatusText.FAIL);
        return next(error);
    }

    return res
        .status(200)
        .json({ status: 'success', data: { course } });
});

const deleteAllCourses = asyncWrapper(async (req, res, next) => {
    const deletedCourses = await courseModel.deleteMany({});
    if (deletedCourses.deletedCount === 0) {
        const error = appError('no courses found to delete', 404, httpStatusText.FAIL);
        return next(error);
    }

    return res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: 'all courses deleted successfully',
        data: { deletedCourses },
    });
});


const createNewCourse = asyncWrapper(async (req, res) => {

    const newCourse = await courseModel.create(req.body);

    return res.status(201).json({
        status: 'success',
        data: { newCourse },
    });

}
)
export {
    getAllCourses,
    getCourseById,
    createNewCourse,
    deleteAllCourses
}
