const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-password');

    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id/*oid*/).select('-password');

    if (!user) {
        res.status(500).json({ message: 'The user with the given ID was not found.' })
    }
    res.status(200).send(user);
})

router.post('/', async (req, res) => {
    let user = new User({
        id: req.body.id,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        username: req.body.username,
        gender: req.body.gender,
        image: req.body.image,
        role: req.body.role
    })
    user = await user.save();

    if (!user)
        return res.status(400).send('The user cannot be created!')

    res.send(user);
})

router.put('/:id', async (req, res) => {

    const userExist = await User.findById(req.params.id/*oid*/);
    let newPassword
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.password;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id/*oid*/,
        {
            id: req.body.id,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            username: req.body.username,
            gender: req.body.gender,
            image: req.body.image,
            role: req.body.role,
            street: req.body.street,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        })
},
    { new: true }
)

if (!user)
    return res.status(400).send('The user cannot be created!')

res.send(user);
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.SECRET;
    if (!user) {
        return res.status(400).send('User not found.');
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            {
                userId: user.id/*oid*/,
                isAdmin: user.isAdmin
            },
            secret,
            { expiresIn: '1d' }
        )

        res.status(200).send({ user: user.email, token: token, email:user.email, image:user.image })
    } else {
        res.status(400).send('Password is wrong!');
    }


})


router.post('/register', async (req, res) => {
    let user = new User({
        id: req.body.id,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: newPassword,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        username: req.body.username,
        gender: req.body.gender,
        image: req.body.image,
        role: req.body.role,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })
    user = await user.save();

    if (!user)
        return res.status(400).send('The user cannot be created!')

    res.send(user);
})


router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id/*oid*/).then(user => {
        if (user) {
            return res.status(200).json({ success: true, message: 'the user is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "user not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})

router.get('/get/count', async (req, res) => {
    //const userCount = await User.countDocuments((count) => count)
    const userCount = await User.countDocuments()

    if (!userCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        userCount: userCount
    });
    return;
})


router.post('/kek', async (req, res) => {
    var pass = bcrypt.hashSync(req.body.password, 10)
    console.log(pass);
    res.send(pass);
})


module.exports = router;