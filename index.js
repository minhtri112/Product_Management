const express = require('express') // import thư viện express
const app = express();// gọi hàm express
var methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('express-flash')
require('dotenv').config()// cách sử dụng env

const database = require("./config/database.js");

const systemConfig = require("./config/system.js");

const port = process.env.PORT // port là 3000

app.use(express.static(`${__dirname}/public`)) // sử dụng file tĩnh

app.use(methodOverride('_method'));// sử override
app.use(bodyParser.urlencoded({ extended: false })); // sử dụng body-parser

//flash
app.use(cookieParser('kfkfjfjir'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//End flash



const route = require("./routes/client/index.route"); // nhúng file
const routeAdmin = require("./routes/admin/index.route"); // nhúng file

database.connect();

// Cấu hình pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// App local variables

app.locals.prefixAdmin = systemConfig.prefixAdmin;

// gọi hàm
route(app)
routeAdmin(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})