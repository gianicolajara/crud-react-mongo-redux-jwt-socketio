import { body, ValidationChain } from "express-validator";

export const listValidatorsCategory: Array<ValidationChain> = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must have more than 3 characters"),
];
