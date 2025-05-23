const express = require('express');


const router = express.Router();// tạo ra một router được cung cấp trong express
const validate = require("../../validate/admin/auth.validate");

const controller = require("../../controllers/admin/auth.controller");

router.get('/login', controller.login);

router.post('/login',
    validate.loginPost,
    controller.loginPost
);

router.get('/logout', controller.logout);


module.exports = router; // export router