const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Mysteryshops, Company } = require('../models');

const path = require('path');
const withAuth = require('../utils/auth');
const { group } = require('console');
// /GET /dashboard
router.get('/', withAuth, (req, res) => {
    // router.get('/', (req, res) => {

    // Access our Comapany model and run .findAll() method)
    console.log("from api/company your username is", req.session.username);
    console.log("from api/company your userId is", req.session.user_id);
    console.log(req.session);

    Mysteryshops.findAll({
            where: {
                userId: req.session.user_id
                    // userId: 1
            },
            group: ['company_id'],
            attributes: [
                [sequelize.fn('sum', sequelize.col('total')), 'total']
            ],

            include: [{
                model: Company,
            }],


        })
        .then(dbShops => {
            const shops = dbShops.map((shop) => shop.get({ plain: true }));
            console.log("The shops are ", shops);

            res.render("dash", {
                layout: "dashboard",
                user: req.session.username,
                // user: "sean2073",
                shops
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/newshop', withAuth, (req, res) => {

    // router.get('/newshop', (req, res) => {

    res.render("newShop", {
        layout: "dashboard"

    })
});



router.get('/newcompany', withAuth, (req, res) => {
    // router.get('/newcompany', (req, res) => {


    res.render("newCompany", {
        layout: "dashboard"

    });
});
//dashboard/company
router.get('/company', withAuth, (req, res) => {
    // router.get('/company', (req, res) => {


    // Access our Comapany model and run .findAll() method)
    console.log("from api/company your username is", req.session.username);
    console.log("from api/company your userId is", req.session.user_id);
    console.log(req.session);

    Company.findAll({
            where: {
                userId: req.session.user_id
                    // userId: 1
            },
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }]
        })
        // .then(dbUserData => res.json(dbUserData))
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });

            //   res.json(dbUserData);
        })

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;