
import mongoose from 'mongoose';
import express from 'express'
import dotenv from 'dotenv'
import coursesRouter from './routes/courses.routes.js'
import usersRouter from './routes/users.route.js'


dotenv.config()
const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'))

mongoose.connect('mongodb://127.0.0.1:27017/courses')
    .then((resolve) => { console.log('mongoDB server started') })
    .catch((reject) => { console.log("failed to connect to server") });


app.use('/courses', coursesRouter)
app.use('/users', usersRouter)

app.use((error, req, res, next) => {
    console.log(error)
    return res.status(error.statusCode || 500).json({ status: error.statusText || 'error', message: error.message || 'internal server error' })
})




// app.all('*', (req, res, next) => {
//     return res.status(404).json({
//         status: httpStutusText.ERROR,
//         message: 'Not Found Page'
//     });
// });

app.listen(process.env.PORT, () => {
    console.log("listening on port: 4000")
})
