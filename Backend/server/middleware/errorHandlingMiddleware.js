export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "An internal server error occurred";
  res.status(statusCode).json({ error: message });
};
