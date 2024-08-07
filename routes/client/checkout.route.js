const express = require('express');


const router = express.Router();// tạo ra một router được cung cấp trong express


const controller = require("../../controllers/client/checkout.controller.js");

router.get('/',controller.index );

router.post('/order',controller.order );

router.get('/success/:orderId',controller.success );



module.exports = router; // export router