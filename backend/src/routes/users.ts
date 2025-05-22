import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.post("/register", [
    check("firstName", "First Name Is Required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("mobile", "Valid Mobile number is required").isNumeric(),
    check("password", "Password with 6 or more characters").isLength({ min:6 })
], 

async (req: Request, res: Response): Promise<void> => { // Changed return type to void

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array()});
        return;
    }
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            res.status(400).json({ message: "User with the same email found" });
            return;
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1h",
        });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({ message: "User registered successfully" });


    } catch (error) {

        console.error(error);

        res.status(500).json({ message: "Something went wrong" });

    }
});

export default router;
