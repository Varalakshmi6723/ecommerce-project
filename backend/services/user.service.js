
const mongoose = require("mongoose");
const User = require("../models/user.model");
const UserProfile = require("../models/user.profile");
const bcrypt = require("bcryptjs");
const tokenService = require("../jwt/token.service");
const emailService = require("../email/email.service");

class UserService {

    // Get all active users
    async getAllUsers() {
        return await User.find({ isActive: true });
    }

    // Get user by ID
    async getUserById(id) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        const userData = await User.findById(id);
        const profileData = await UserProfile.findOne({ user: id });

        if (!userData) {
            return null;
        }

        return { userData, profileData };
    }

    // Create user
    async createUser({ name, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);

        return await User.create({
            name,
            email,
            password: hashedPassword
        });
    }

    // User signup
    async userSignup({ name, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const userData = user.toObject();
        delete userData.password;

        return userData;
    }

    // User login
    async loginUser(email, password) {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new Error("User not found");
        }

        if (user.isActive === false) {
            throw new Error("Account is inactive");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        };

        const token = tokenService.generateToken(payload);

        const userData = user.toObject();
        delete userData.password;

        return {
            user: userData,
            token
        };
    }

    // Update user
    async updateUser(id, { name, email }) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        return await User.findByIdAndUpdate(
            id,
            { name, email },
            { returnDocument: "after", runValidators: true }
        );
    }

    // Update selected user fields
    async patchUser(id, updates) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        const allowedUpdates = {};

        if (updates.name !== undefined) {
            allowedUpdates.name = updates.name;
        }

        if (updates.email !== undefined) {
            allowedUpdates.email = updates.email;
        }

        if (updates.phone !== undefined) {
            allowedUpdates.phone = updates.phone;
        }

        if (updates.address !== undefined) {
            allowedUpdates.address = updates.address;
        }

        return await User.findByIdAndUpdate(
            id,
            { $set: allowedUpdates },
            { returnDocument: "after", runValidators: true }
        );
    }

    // Soft delete user
    async softDelete(id) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        return await User.findByIdAndUpdate(
            id,
            { isActive: false },
            { returnDocument: "after", runValidators: true }
        );
    }

    // Permanently delete user
    async deleteUser(id) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }

        return await User.findByIdAndDelete(id);
    }

    // Add user profile
    async addUserProfile(userId, profileData) {
        if (!mongoose.isValidObjectId(userId)) {
            throw new Error("Invalid user ID");
        }

        const existingProfile = await UserProfile.findOne({
            user: userId
        });

        if (existingProfile) {
            throw new Error("User profile already exists");
        }

        return await UserProfile.create({
            user: userId,
            age: profileData.age,
            dob: profileData.dob,
            bio: profileData.bio,
            address: profileData.address,
            phone: profileData.phone
        });
    }

    // Forgot password
    async requestPasswordReset(email) {
        return await emailService.requestPasswordReset(email);
    }

    // Reset password
    async resetPassword({ email, otp, newPassword }) {
        return await emailService.resetPassword({
            email,
            otp,
            newPassword
        });
    }
}

module.exports = new UserService();
