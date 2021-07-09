const express = require('express')
const router = express.Router();
//////////////////////////////////////////////////////////////////
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

// Get all product and get one product 
router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);

// Add new product
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

// Update product
router.route('/admin/product/:id').put(isAuthenticatedUser , authorizeRoles('admin'),updateProduct);

// Delete product
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

// Reviews
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;
