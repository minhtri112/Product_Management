const express = require('express');
const multer = require('multer');
const upload = multer()
//  const upload = multer({ dest: './public/uploads/' })
const uploadCloud = require("../../middlewares/admin/uploadCloud-middleware.js");

const validate = require("../../validate/admin/account.validata.js");



const router = express.Router();// tạo ra một router được cung cấp trong express

const controller = require("../../controllers/admin/account.controller.js");

router.get('/',controller.index );
router.get('/create',controller.create );


router.post('/create',
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPatch 
);


router.get('/edit/:id',controller.edit );

router.patch('/edit/:id',
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch 
);

module.exports = router; // export router