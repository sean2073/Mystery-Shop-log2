const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const companyRoutes = require('./company-routes.js');
const shopRoutes = require('./shop-routes.js');

router.use('/users', userRoutes);
router.use('/company', companyRoutes);
router.use('/shops', shopRoutes);


module.exports = router;