const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Application = require("../models/Application");

// Get all applications
router.get("/", auth, async (req, res) => {
  const apps = await Application.find({ user: req.user.id });
  res.json(apps);
});

// Add application
router.post("/", auth, async (req, res) => {
  const { company, position, status, notes } = req.body;
  const app = new Application({
    user: req.user.id,
    company,
    position,
    status,
    notes,
  });
  await app.save();
  res.json(app);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const app = await Application.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(app);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Application.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Deleted" });
});

module.exports = router;
