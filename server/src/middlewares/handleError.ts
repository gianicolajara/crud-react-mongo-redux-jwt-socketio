import { ErrorRequestHandler } from "express";
import { Result } from "express-validator";

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  //express validator
  if (err instanceof Result) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      typeError: "expressValidator",
      errors: err.mapped(),
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      typeError: "validationError",
      errors: Array.from(Object.values(err.errors)),
    });
  }

  if (err.name === "CastError") {
    return res.status(500).json({
      status: 500,
      typeError: "castError",
      message: "ID cast error",
    });
  }

  //otros errores
  res.status(500).json({
    error: err.message || "Internal Server Error",
    typeError: "internalError",
    status: 500,
  });
};

export default handleError;
