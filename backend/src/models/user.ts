import mongoose from "mongoose";

import bcrypt from "bcryptjs";

export type UserType = {
    _id: string;
    email: string;
    password: string;
    mobile: number;
    firstName: string;
    lastName: string;
};

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
});

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;