const errorHandler = (err, req, res, next) => {
  // İstemciye http-errors tarafından oluşturulan hataları handle et
  if (err.status) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.message,
    });
  }

  // Diğer tüm hataları 500 internal server error olarak handle et
  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    data: err.message,
  });
};

export default errorHandler;