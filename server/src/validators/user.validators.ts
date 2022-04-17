import { body, ValidationChain } from "express-validator";

export const validatorsUpdateUser: Array<ValidationChain> = [
  body("username")
    .isLength({ min: 8, max: 20 })
    .withMessage("Username must be between 8 and 20 characters"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password"),
  body("roles")
    .exists()
    .withMessage("Roles is required")
    .isArray()
    .custom((value: string[]) => {
      if (value[0] === "") {
        throw new Error("Roles is required");
      }
      return true;
    }),
];
