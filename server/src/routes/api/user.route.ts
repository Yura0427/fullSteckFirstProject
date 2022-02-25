import { validateUser, userIsExists, userNotExists } from '../../validators/validateUser';
import { Router } from "express";
import UserController from "../../controllers/user.controller";

const router: Router = Router();

router.post("/login", UserController.login.bind(UserController));
router.post("/register", validateUser, userIsExists, UserController.register.bind(UserController));

export default router;
