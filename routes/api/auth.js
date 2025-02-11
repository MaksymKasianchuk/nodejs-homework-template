const express = require("express");

const {validation, controllerWrapper, authenticate} = require("../../middlewares");
const {auth: ctrl} =require("../../controllers");
const { joiSchema } = require("../../models/user");

const router = express.Router();
const userValidationMiddleware = validation(joiSchema);

router.post("/register", userValidationMiddleware, controllerWrapper(ctrl.register));

router.post("/login", userValidationMiddleware, controllerWrapper(ctrl.login));

router.get("/logout", controllerWrapper(authenticate), controllerWrapper(ctrl.logout));

router.get("/current", controllerWrapper(ctrl.current));
module.exports = router;