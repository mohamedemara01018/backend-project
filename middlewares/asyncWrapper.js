
export const asyncWrapper = (asyncFn) => {
    return (req, res, next) => {
        // asyncFn(req, res, next).catch((error) => {
        //     next(error)
        // })
        Promise.resolve(asyncFn(req, res, next)).catch((error) => {
            next(error)
        })
    }
}