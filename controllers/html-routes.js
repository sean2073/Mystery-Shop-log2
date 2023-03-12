const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Company } = require('../models');
// const path = require('path');
const withAuth = require('../utils/auth');

//The route of website  http://localhost:3011/
router.get("/home", (req, res) => {
    // router.get('/', (req, res) => {

    console.log("i'm about to send my layout");
    res.render("home-page", {
        layout: "main"
    });

});

router.get("/login", (req, res) => {
    console.log("You're logged in as ", req.session.loggedIn);
    if (req.session.loggedIn) {
        // res.redirect("/dashboard");
        res.redirect("/home");

        return;
    }

    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home');
        return;
    }

    res.render("signup");
});
module.exports = router;