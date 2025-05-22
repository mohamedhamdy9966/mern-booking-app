import Express, { Request, Response} from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = Express.Router();

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "password with 6 or more characters required").isLength({
        min: 6,
    }),
], async (req: Request, res: Response): Promise<void> =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array()
        })
        return;
    }
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
         res.status(400).json({ message: "Invalid Credentials"})
         return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        res.status(400).json({ message: "Invalid Credentials"})
        return;
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1h",
        });

        res.cookie("auth_token",token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
        });
        
        res.status(200).json({userId: user._id});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something wrong"})
    }
}
);

router.get("/validate-token", verifyToken, (req: Request, res: Response)=>{
    res.status(200).send({userId: req.userId});
});

export default router;