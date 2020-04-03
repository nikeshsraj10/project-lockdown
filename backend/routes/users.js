const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find().then(users => res.json(users)).catch(err => res.status(400).json( `Error: ${err}`));
})
//Above block runs when we hit localhost:5000/users/

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/add').post((req, res) => {
    console.log(req.body);
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: +req.body.gender,
        birthdate: Date.parse(req.body.birthdate),
        country: req.body.country,
        mobile: req.body.mobile
    });

    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.gender = +req.body.gender;
            user.birthdate = Date.parse(req.body.birthdate);
            user.country = req.body.country;
            user.mobile = req.body.mobile;

            user.save()
                .then(() => res.json('User Updated'))
                .catch((err) => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted!'))
        .catch(err => res.status(400).json(`Error; ${err}`));
});


module.exports = router;
//Date.parse(date) the date field //Number(field) //convert to number