const express = require("express");
const Category = require("../models/faqCategory");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const data = await Category.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Add a new user
router.post("/add", async (req, res) => {
  try {
    const newData = new Category(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Delete a user by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params; // ✅ Correct way to get URL parameters
    const result = await Category.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;

router.put("/update/:id", async (req, res) => {
  try {
    const updatedUser = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
