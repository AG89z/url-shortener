function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
}

module.exports = errorHandler;
