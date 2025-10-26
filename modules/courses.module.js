import mongoose from "mongoose";
const coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    }
})


const courseModel = mongoose.model('Courses', coursesSchema);

export {
    courseModel
}