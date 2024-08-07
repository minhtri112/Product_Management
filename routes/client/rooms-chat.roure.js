const express = require('express');


const router = express.Router();// tạo ra một router được cung cấp trong express


const controller = require("../../controllers/client/rooms-chat.controller.js");

router.get('/',controller.index );

router.get('/create',controller.create );

router.post('/create',controller.createPost );


module.exports = router; // export router