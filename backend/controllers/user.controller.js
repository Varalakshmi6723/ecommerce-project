
const userService = require("../services/user.service");
const tokens = require("../jwt/token.service");
const passwordReset = require('../email/passwordReset');

class UserController {

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get logged-in user profile
  async getUserProfile(req, res) {
    try {
      const user = await userService.getUserById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Create user
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Name, email and password are required"
        });
      }

      const newUser = await userService.createUser({
        name,
        email,
        password
      });

      res.status(201).json(newUser);

    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({
          message: "User with this email already exists"
        });
      }

      res.status(400).json({ error: err.message });
    }
  }

  // Update user - PUT
  async updateUser(req, res) {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          message: "Name and email are required for PUT"
        });
      }

      const updatedUser = await userService.updateUser(
        req.params.id,
        { name, email }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);

    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({
          message: "Email already exists"
        });
      }

      res.status(400).json({ error: err.message });
    }
  }

  // Partial update - PATCH
  async patchUser(req, res) {
    try {
      const updates = {};

      if (req.body.name !== undefined) {
        updates.name = req.body.name;
      }

      if (req.body.email !== undefined) {
        updates.email = req.body.email;
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          message: "Provide name or email to update"
        });
      }

      const updatedUser = await userService.patchUser(
        req.params.id,
        updates
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);

    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({
          message: "Email already exists"
        });
      }

      res.status(400).json({ error: err.message });
    }
  }

  // Delete user
  async deleteUser(req, res) {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // User signup
  async userSignup(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "All fields are required"
        });
      }

      const newUser = await userService.userSignup({
        name,
        email,
        password
      });

      const token = tokens.generateToken(newUser);

      res.status(201).json({
        message: "Signup successful",
        token,
        user: newUser
      });

    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({
          message: "Email already registered"
        });
      }

      res.status(400).json({ error: err.message });
    }
  }

  // User login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required"
        });
      }

      const loginData = await userService.loginUser(email, password);

      // Supports either a user object or { user: userObject }
      const loggedInUser = loginData.user || loginData;

      const token = tokens.generateToken(loggedInUser);

      res.status(200).json({
        message: "Login successful",
        token,
        user: loggedInUser
      });

    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

  // Add user profile
  async addUserProfile(req, res) {
    try {
      const { userId, age, dob, bio, address, phone } = req.body;

      if (!userId) {
        return res.status(400).json({
          message: "User ID is required"
        });
      }

      const newProfile = await userService.addUserProfile(userId, {
        age,
        dob,
        bio,
        address,
        phone
      });

      res.status(201).json(newProfile);

    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({
          message: "Profile already exists"
        });
      }

      res.status(400).json({ error: err.message });
    }
  }

  // Forgot password
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "Email is required"
        });
      }

      const result = await passwordReset.requestPasswordReset(email);

      res.status(200).json(result);

    } catch (err) {
      res.status(err.statusCode || 500).json({
        error: err.message
      });
    }
  }

  // Reset password
  async resetPassword(req, res) {
    try {
      const { email, otp, newPassword } = req.body;

      if (!email || !otp || !newPassword) {
        return res.status(400).json({
          message: "Email, OTP and new password are required"
        });
      }

      const result = await passwordReset.resetPassword({
        email,
        otp,
        newPassword
      });

      res.status(200).json(result);

    } catch (err) {
      res.status(err.statusCode || 400).json({
        error: err.message
      });
    }
  }
}

module.exports = new UserController();
