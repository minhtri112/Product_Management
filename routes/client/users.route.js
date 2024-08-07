const express = require('express');


const router = express.Router();// tạo ra một router được cung cấp trong express


const controller = require("../../controllers/client/users.controller.js");

router.get('/not-friend',controller.notFriend );

router.get('/request',controller.request );

router.get('/accept',controller.accept );

router.get('/friends',controller.friends );


module.exports = router; // export router