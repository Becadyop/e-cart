var express = require('express');
var router = express.Router();

var{
  home,
  login,
  register,
  doregister,
  dologin,
  myorder,
  logout,
  addtocart,
  buynow,
  checkout,
  cancelpage,
  payVerify,
  cartPage
  
}=require('../Controllers/Usercontroller');
const checkuser = require('../Middlewares/Checkuser');

/* GET home page. */
router.get('/',home);
router.get('/login',login);
router.post('/login',dologin);
router.get('/register',register);
router.post('/register',doregister)
router.get('/myorder',checkuser,myorder)
router.get('/cancel',cancelpage)
router.get('/logout',logout)
router.get('/add-to-cart/:pid',addtocart)
router.get('/cart',checkuser,cartPage)
router.get('/buynow/:id',buynow)
router.get('/checkout/:price',checkuser,checkout)
router.post('/verify',payVerify)

module.exports = router;
