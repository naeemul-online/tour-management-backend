import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DivisionRoute } from "../modules/division/division.route";

export const router = Router();

const moduleRoute = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/division",
    route: DivisionRoute,
  },
];

moduleRoute.forEach((route) => {
  router.use(route.path, route.route);
});
