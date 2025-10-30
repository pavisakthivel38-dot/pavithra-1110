const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Offered", "Rejected"],
    default: "Applied",
  },
  dateApplied: { type: Date, default: Date.now },
  notes: { type: String },
});

module.exports = mongoose.model("Application", ApplicationSchema);
