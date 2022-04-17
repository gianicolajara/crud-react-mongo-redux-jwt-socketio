import { body, ValidationChain } from "express-validator";

export const registerAuthValidatorsList: Array<ValidationChain> = [
  body("username")
    .isLength({ min: 8, max: 20 })
    .withMessage("Username must be between 8 and 20 characters"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number and one special character"
    ),
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

export const loginAuthValidatorsList: Array<any> = [
  registerAuthValidatorsList[0],
  registerAuthValidatorsList[2],
];
