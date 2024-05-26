import { Router } from "express";
import { Loginhandle, Registerhandle, getuser } from "../Controllers/User.controller.js";

const router= Router();

router.route("/login").post(Loginhandle);
router.route("/register").post(Registerhandle);
router.route("/get/:id").get(getuser);

export {router};