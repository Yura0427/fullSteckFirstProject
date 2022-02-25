import { Router } from "express";

const router: Router = Router();

router.get("/login", (_req, res) => { res.send("login") });
router.get("/register", (_req, res) => { res.send("register") })

export default router;
