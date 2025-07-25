import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DivisionRoute } from "../modules/division/division.route";
import { TourRoutes } from "../modules/tour/tour.route";

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
  {
    path: "/tour",
    route: TourRoutes,
  },
];

moduleRoute.forEach((route) => {
  router.use(route.path, route.route);
});
