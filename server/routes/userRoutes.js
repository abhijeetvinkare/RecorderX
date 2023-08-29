const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const authMiddleware = require("../middleware/authMiddleware")

const users = require("../modules/users");

// Register New User
router.post("/new-user-sign-up", async (req, res) => {
  try {
    const { username, useremail, userpass } = req.body;
    const newuser = await users.findOne({ useremail: useremail });

    if (newuser) {
      res.send({ message: "exists!" });
    } else {
      const hashedPassword = await bcrypt.hash(userpass, 10);

      const newuser = new users({
        username,
        useremail,
        userpass: hashedPassword,
      });

      await newuser.save();
      res.json(newuser);
    }
  } catch (error) {
    res.status(500).send({ message: "Error registering user" });
  }
});

// User login authentication
router.post("/log-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ useremail: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.userpass);

      if (isMatch) {
        const responseUser = {
          _id: user._id,
          name: user.username,
          email: user.useremail,
        };

        generateToken(res,user._id);
        res.send({ message: "Successful", user: responseUser });
      } else {
        res.send({ message: "Password does not match" });
      }
    } else {
      res.send({ message: "User not found!" });
    }
  } catch (err) {
    console.error("Error:", err); // Log the error
    res.status(500).send({ message: "An error occurred" });
  }
});


router.post('/dashboard', authMiddleware, async (req, res) => {
  try {
    const validate_user = await users.findOne({ _id: req.user._id });
    res.status(201).json({ message: "Success!User_Valid!", name:validate_user.username });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});


router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
