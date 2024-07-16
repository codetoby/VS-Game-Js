const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
}

module.exports = errorMiddleware;