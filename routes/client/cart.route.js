const express = require('express');


const router = express.Router();// tạo ra một router được cung cấp trong express


const controller = require("../../controllers/client/cart.controller.js");

router.get('/',controller.index);


router.post('/add/:productId',controller.cartPost );

router.get('/deleted/:productId',controller.delete );

router.get('/update/:productId/:quantity',controller.update );






module.exports = router; // export router