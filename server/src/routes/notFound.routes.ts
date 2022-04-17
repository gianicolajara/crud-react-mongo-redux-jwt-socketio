import { Request, RequestHandler, Response, Router } from "express";

const notFoundRouter = Router();

notFoundRouter.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Not found",
    status: 404,
  });
});

export default notFoundRouter;
