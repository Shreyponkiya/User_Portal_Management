const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendMail = require("../controllers/user");
const router = express.Router();
const cron = require("node-cron");

const secret_key = "ShreyPonkiya@1011";

// Get all users

router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    console.log("User database : ", data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const login_url = `http://localhost:4000/user/verify/${jwt.sign(
      { email },
      secret_key
    )}`;

    const newUser = new User({ username, email, password, isVerified: false });
    await newUser.save();
    sendMail(email, login_url);
    cron.schedule("0 0 * * *", () => {
      sendMail(email, login_url);
    });
    res
      .status(201)
      .json({ message: "User registered. Verification email sent." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, secret_key);

    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      { verify: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("<h2>User not found.</h2>");
    }

    res.send(`
      <h2>Email Verified Successfully</h2>
      <p>You will be redirected to the login page shortly...</p>
      <script>
        setTimeout(() => {
          window.location.href = "http://localhost:5173";
        }, 3000); // Redirect after 3 seconds
      </script>
    `);
  } catch (err) {
    res.status(400).send("<h2>Invalid or expired token.</h2>");
  }
});

module.exports = router;

// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const sendMail = require("../controllers/user");
// const router = express.Router();
// var Login_url;
// const secret_key = "ShreyPonkiya@1011";

// // Get all users
// router.get("/", async (req, res) => {
//   try {
//     const data = await User.find();
//     console.log("User database : ", data);

//     const token = jwt.sign({ user: "sampleUser" }, secret_key, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({ data, token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add a new user
// router.post("/add", async (req, res) => {
//   try {
//     Login_url = req.body.login_url;
//     console.log("data user : ", login_url);
//     console.log("data user : ", req.body);
//     const newData = new User(req.body);
//     sendMail(req.body.email, Login_url);
//     await newData.save();
//     res.status(201).json(newData);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.get(`/${Login_url}`, (req, res) => {
//   res.send("WelCome Your email is verify");
// });

// // Delete a user by ID
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await User.deleteOne({ _id: id });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // ✅ Move update route ABOVE `module.exports`
// router.put("/update/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // ✅ Correct export statement
// module.exports = router;
