const express = require('express');
const router = express.Router();// tạo ra một router được cung cấp trong express
const multer = require('multer');

// const storageMulter = require('../../helpers/storageMulter');
// const upload = multer({ storage: storageMulter()  })
const upload = multer()
//  const upload = multer({ dest: './public/uploads/' })
const uploadCloud = require("../../middlewares/admin/uploadCloud-middleware.js");



const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validate/admin/product-category.validate");




router.get('/', controller.index);


router.get('/create', controller.create);

router.delete('/delete/:id', controller.deleteItem);

router.patch('/change-status/:status/:id', controller.changeStatus);



router.post('/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
 );


 router.get('/edit/:id', controller.edit);

 router.patch('/edit/:id',
    upload.single('thumbnail'),
    validate.createPost,
    uploadCloud.upload,
    controller.editPatch
  );

module.exports = router; // export router