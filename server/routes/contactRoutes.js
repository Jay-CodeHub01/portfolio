const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log(name, email, subject, message);

  res.status(200).json({
    success: true,
    message: "Message received",
  });
});

module.exports = router;