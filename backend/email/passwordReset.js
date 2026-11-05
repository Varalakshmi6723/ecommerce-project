
const User = require('../models/user.model');
const Otp = require('../models/otp.model');
const bcrypt = require('bcryptjs');
const emailService = require('./email.service');

// Generate 4-digit OTP
const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// FORGOT PASSWORD
const requestPasswordReset = async (email) => {

    if (!email) {
        throw new Error('Email is required');
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
        throw new Error('User with this email not found');
    }

    // Disable previous OTPs
    await Otp.updateMany(
        { email: normalizedEmail, used: false },
        { $set: { used: true } }
    );

    const otp = generateOtp();

    await Otp.create({
        email: normalizedEmail,
        otp: otp,
        used: false,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    // Send OTP through email service
    await emailService.sendPasswordResetEmail({
        email: normalizedEmail,
        otp: otp,
        name: user.name
    });

    return {
        message: 'OTP sent successfully to your email'
    };
};

// RESET PASSWORD
const resetPassword = async ({ email, otp, newPassword }) => {

    if (!email || !otp || !newPassword) {
        throw new Error('Email, OTP and new password are required');
    }

    if (newPassword.length < 6) {
        throw new Error('Password must contain at least 6 characters');
    }

    const normalizedEmail = email.trim().toLowerCase();

    const otpRecord = await Otp.findOne({
        email: normalizedEmail,
        otp: otp.trim(),
        used: false,
        expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
        throw new Error('Invalid or expired OTP');
    }

    const user = await User.findOne({
        email: normalizedEmail
    }).select('+password');

    if (!user) {
        throw new Error('User not found');
    }

    // Password hashing - confirm against your user.model.js
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    otpRecord.used = true;
    await otpRecord.save();

    return {
        message: 'Password reset successfully'
    };
};

module.exports = {
    requestPasswordReset,
    resetPassword
};
