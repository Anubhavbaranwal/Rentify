import { Router } from "express";
import { addProperty, deleteProperty, filterProperty, getProperties, getProperty, getPropertyofseller, updateProperty } from "../Controllers/Property.controller.js";
import { VerifyJWT } from "../middleware/user.middleware.js";

const router = Router();

router.route("/").post(VerifyJWT,addProperty);
router.route("/").get(VerifyJWT, getProperties);
router.route("/seller").get(VerifyJWT, getPropertyofseller);
router.route("/:id").get(VerifyJWT, getProperty);
router.route("/:id").patch(VerifyJWT, updateProperty);
router.route("/:id").delete(VerifyJWT, deleteProperty);
router.route("/fillter").get(filterProperty)



export { router };