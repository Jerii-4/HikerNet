const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import the User model
const User = require("../Modals/User");

// --- SIGN-UP ROUTE ---
// @route   POST /api/auth/signup
// @desc    Register a new user
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }

    // 2. Create a new user instance
    user = new User({
      username,
      email,
      password,
    });

    // 3. Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt
    user.password = await bcrypt.hash(password, salt); // Hash the password

    // 4. Save the user to the database
    await user.save();

    // 5. Create and return a JWT (for immediate login after sign-up)
    const payload = {
      user: {
        id: user.id, // Mongoose provides a virtual 'id' getter
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" }, // Token expires in 5 hours
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token }); // Respond with the token
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// --- LOGIN ROUTE ---
// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // 2. Compare submitted password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // 3. If credentials are correct, create and return a JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
