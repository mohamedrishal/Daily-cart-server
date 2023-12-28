const express = require('express')

const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../MiddleWares/jwtMiddleware')
const wishlistController = require('../Controllers/wishlistController')

const router = new express.Router()


// get all products 
router.get('/products/all',productController.getAllProductsController)

// register
router.post('/user/register',userController.registerController)

// login
router.post('/user/login',userController.loginController)

// getProducts
router.get("/product/get/:id",productController.getProductController)


// add to Wishlist
router.post('/wishlist/add',jwtMiddleware,wishlistController.addTowishlistController)

module.exports = router