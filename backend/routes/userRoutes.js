const User = require("../models/userModel.js");

const router = require("express").Router();


//create user - register
router.post('/', async(req, res)=> {
    try {
      const newUser  = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
      });
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      console.log("Error!");
    }
})

//login user
router.post("/login", async(req, res) => {
    try {

        const {email, password} = req.body;
        console.log(req.body);
        const user = await User.findByCredentials(email, password);
        user.status = "Online";
        await user.save();
        res.status(200).json(user);
    } catch(error) {
        console.log("Error!");
    }
});

module.exports = router;