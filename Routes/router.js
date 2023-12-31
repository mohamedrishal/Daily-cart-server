const express = require('express')

const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../MiddleWares/jwtMiddleware')
const wishlistController = require('../Controllers/wishlistController')
const cartController = require('../Controllers/cartController')

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

// get Wishlist
router.get('/wishlist/get-allProducts',jwtMiddleware,wishlistController.getWishlistController)

// remove item form wishlist
router.delete('/wishlist/remove/:id',jwtMiddleware,wishlistController.removeWishlistItemController)

// addtocart
router.post(`/cart/add`,jwtMiddleware,cartController.addtocartController)


// getcart 
router.get(`/car/get-all-products`,jwtMiddleware,cartController.getCartController)

module.exports = router