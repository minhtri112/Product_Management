const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");
const User = require("../../models/users.model");
// [GET] admin/dashboard
module.exports.dashboard = async (req, res) => {
    const statistic = {
        categoryProduct : {
            total : 0,
            active : 0,
            inactive : 0
        },
        product : {
            total : 0,
            active : 0,
            inactive : 0
        },
        account : {
            total : 0,
            active : 0,
            inactive : 0
        },
        user : {
            total : 0,
            active : 0,
            inactive : 0
        },
    };

    statistic.categoryProduct.total = await ProductCategory.countDocuments({
        delete : false
    });

    statistic.categoryProduct.active = await ProductCategory.countDocuments({
        delete : false,
        status : 'active'
    });

    statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
        delete : false,
        status : 'inactive'
    });

    statistic.product.total = await Product.countDocuments({
        delete : false
    });

    statistic.product.active = await Product.countDocuments({
        delete : false,
        status : 'active'
    });

    statistic.product.inactive = await Product.countDocuments({
        delete : false,
        status : 'inactive'
    });


    statistic.account.total = await Account.countDocuments({
        delete : false
    });

    statistic.account.active = await Account.countDocuments({
        delete : false,
        status : 'active'
    });

    statistic.account.inactive = await Account.countDocuments({
        delete : false,
        status : 'inactive'
    });



    statistic.user.total = await User.countDocuments({
        delete : false
    });

    statistic.user.active = await User.countDocuments({
        delete : false,
        status : 'active'
    });

    statistic.user.inactive = await User.countDocuments({
        delete : false,
        status : 'inactive'
    });



    res.render("admin/pages/dashboard/index.pug",{
        pageTitle : "Trang tổng quan",
        statistic : statistic
    });
}