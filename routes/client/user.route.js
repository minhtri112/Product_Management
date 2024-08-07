const express = require('express');

const router = express.Router();// tạo ra một router được cung cấp trong express

const authMiddleware = require("../../middlewares/client/auth.middleware.js");

const controller = require("../../controllers/client/user.controller.js");

const validate = require("../../validate/client/registerPost.validate.js");

router.get('/register',controller.register );

router.post('/register',validate.registerPost,controller.registerPost);

router.get('/login',controller.login );

router.post('/login',controller.loginPost);

router.get('/logout',controller.logout);

router.get('/password/forgot',controller.forgotPassword);

router.post('/password/forgot',validate.forgotPasswordPost,controller.forgotPasswordPost);

router.get('/password/otp',controller.otpPassword);

router.post('/password/otp',controller.otpPasswordPost);

router.get('/password/reset',controller.resetPassword);

router.post('/password/reset',validate.resetPasswordPost,controller.resetPasswordPost);

router.get('/info',authMiddleware.requireAuth,controller.info);


module.exports = router; // export router