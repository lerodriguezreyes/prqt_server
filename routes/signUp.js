var express = require("express");
var router = express.Router();

const SignUp = require("../models/SignUp");

router.post("/new", (req, res, next) => {
    const { email } = req.body;
  
    // Check if the email is provided as an empty string
    if (!email) {
        res.status(400).json({ message: "Please provide an email for subscription." });
        return;
    }

    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." });
        return;
    }

    // Check the users collection if a user with the same email already exists
    SignUp.findOne({ email })
        .then((foundEmail) => {
            if (foundEmail) {
                res.status(400).json({ message: "Email is already registered." });
                return;
            }
            // Create the email if not found
            SignUp.create({ email })
                .then((newEmail) => {
                    console.log("Email provided by user ====>", newEmail);
                    res.json(newEmail);
                })
                .catch((err) => {
                    console.log("Error while registering email:", err);
                    res.status(500).json({ message: "Error while registering email. Try again." });
                });
        })
        .catch((err) => {
            console.log("Error checking for email:", err);
            res.status(500).json({ message: "Error checking for email. Try again." });
        });
});

module.exports = router;