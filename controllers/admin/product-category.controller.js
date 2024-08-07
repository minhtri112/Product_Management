const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system.js");
const createTreeHelper = require("../../helpers/create-tree.js");
const filterStatusHelper = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");


// [GET] admin/products-category
module.exports.index = async (req, res) => { // truy cập vào trang chủ
    let find = {
        delete : false,
    }


    const filterStatus = filterStatusHelper(req.query);
    if (req.query.status)
        find.status = req.query.status;

    // End Tính năng bộ lọc



    // Chức năng tìm kiếm

    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    // End Chức năng tìm kiếm
    const records = await ProductCategory.find(find);    
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        filterStatus: filterStatus,
        keyword: objectSearch.regex,
        records : newRecords
    });
}



// [GET] admin/products-category/create
module.exports.create = async (req, res) => { // truy cập vào trang chủ
    let find = {
        delete : false
    }
    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);


    res.render("admin/pages/products-category/create.pug", {
        pageTitle: "Danh mục sản phẩm",
        records : newRecords
    });
}


// [POST] admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.postion == "") {
        const count = await ProductCategory.countDocuments({});
        req.body.postion = count + 1;
    }
    else{
        req.body.postion = parseInt(req.body.postion);
    }
    const record = new ProductCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}



// [GET] admin/products-category/edit
module.exports.edit = async (req, res) => {
    console.log(req.params.id);
    const data = await ProductCategory.findOne({
        _id : req.params.id,
        delete : false
    });
    const records = await ProductCategory.find({delete : false});
    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/edit.pug", {
        pageTitle: "Trang cập nhật danh mục",
        data : data,
        records : newRecords
    });

}


// [PATCH] admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.postion = parseInt(req.body.postion);

    await ProductCategory.updateOne(
        {_id : id},
        req.body
    );
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    
}

// [PATCH] admin/products-category/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;


    // Cập nhật delete = true;

    await ProductCategory.updateOne(
        {_id : id},
        {
            delete : true,
            deleteBy : {
                account_id : res.locals.user.id,
                deleteAt : new Date()
            }
        }
    );

    req.flash('success', `Xóa thành công sản phẩm`);
    res.redirect("back");
}


// [PATCH] admin/products-category/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await ProductCategory.updateOne({ _id: id }, { 
        status: status
    });
    req.flash('success', 'Cập nhật trạng thái thành công');
    res.redirect("back");
}

