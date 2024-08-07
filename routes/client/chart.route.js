const express = require('express');
const authMiddleware = require("../../middlewares/client/auth.middleware.js");
const chatMiddleware = require("../../middlewares/client/chat.middleware.js");


const router = express.Router();// tạo ra một router được cung cấp trong express


const controller = require("../../controllers/client/chart.controller.js");

router.get('/:room_chat_id',chatMiddleware.isAccess,controller.index );


module.exports = router; // export router