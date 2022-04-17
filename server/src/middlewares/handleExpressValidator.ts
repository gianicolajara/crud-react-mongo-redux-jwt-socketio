import { ErrorRequestHandler, RequestHandler } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const handleExpressValidator: RequestHandler = (req, res, next) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors);
  }
  next();
};
