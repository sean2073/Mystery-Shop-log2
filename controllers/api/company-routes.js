const router = require('express').Router();
const { User, Company } = require('../../models');
const withAuth = require("../../utils/auth");



// GET /api/company
// router.get('/', withAuth, (req, res) => {
router.get('/', (req, res) => {


    // Access our Comapany model and run .findAll() method)
    console.log("from api/company your username is", req.session.username);
    console.log("from api/company your userId is", req.session.user_id);
    console.log(req.session);

    Company.findAll({
            where: {
                // userId: req.session.user_id

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

// GET /api/company/1
router.get('/:id', (req, res) => {
    Company.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No company found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// // POST /api/company
// router.post('/', withAuth, (req, res) => {
router.post('/', (req, res) => {

    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    console.log("The userid = ", req.session.user_id);
    console.log(req.session);

    Company.create({
            company_name: req.body.company_name,
            payment_date: req.body.payment_date,
            paypal: req.body.paypal,
            // userId: req.session.user_id
            userId: 1

        })
        .then(newCompany => {
            res.json(newCompany);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// // PUT /api/company/1
// // router.put('/:id', (req, res) => {});
router.put('/:id', (req, res) => {
    //     // expects {company_name: 'Spies Like Us', payment_date: 2, paypal: true, userId: 1}

    //     // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Company.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'There is not a company with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// // DELETE /api/company/1
router.delete('/:id', (req, res) => {
    Company.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No company found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});




module.exports = router;