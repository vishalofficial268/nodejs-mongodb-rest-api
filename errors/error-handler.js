const error_handler = (req, res, next) => {
    let error = new Error("Requested endpoint not found.");
    error.status = 404;
    next(error);
}


module.exports = { error_handler }