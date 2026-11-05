
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
//const passwordReset = require("../email/passwordReset");

// PUBLIC ROUTES

router.post("/signup", userController.userSignup);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

// AUTHENTICATION MIDDLEWARE

// Routes below this middleware require a valid JWT token
router.use(authMiddleware);

// GET all users
router.get("/", userController.getAllUsers);

// GET logged-in user profile
router.get("/me", userController.getUserProfile);

// CREATE new user
router.post("/", userController.createUser);

// ADD user profile
router.post("/adduserprofile", userController.addUserProfile);

// GET user by ID
router.get("/:id", userController.getUserById);

// UPDATE user - PUT
router.put("/:id", userController.updateUser);

// PARTIAL UPDATE user - PATCH
router.patch("/:id", userController.patchUser);

// DELETE user
router.delete("/:id", userController.deleteUser);

module.exports = router;
