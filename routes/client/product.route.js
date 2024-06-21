const express = require('express');


const router = express.Router();// tạo ra một router được cung cấp trong express

const controller = require("../../controllers/client/product.controller.js");


router.get('/', controller.index);
router.get('/:slug', controller.detail);


module.exports = router; // export router