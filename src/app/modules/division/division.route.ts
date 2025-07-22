import { Router } from "express";
import { DivisionController } from "./division.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDivisionZodSchema } from "./division.validate";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/create-division",
  validateRequest(createDivisionZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DivisionController.createDivision
);

export const DivisionRoute = router;
