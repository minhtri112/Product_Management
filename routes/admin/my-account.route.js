const express = require('express');
const multer = require('multer');
const upload = multer()
//  const upload = multer({ dest: './public/uploads/' })
const uploadCloud = require("../../middlewares/admin/uploadCloud-middleware.js");


const router = express.Router();// tạo ra một router được cung cấp trong express


const controller = require("../../controllers/admin/my-account.controller.js");

router.get('/',controller.index );
router.get('/edit',controller.edit );
router.patch(
    '/edit',
    upload.single('avatar'),
    uploadCloud.upload,
    controller.editPatch
 );


module.exports = router; // export router