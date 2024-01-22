import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import pool from "../config/db.js";
import fs from "fs";
import path from "path";
import { UPLOADS_FOLDER } from "../utils/pathUtils.js";
import { updateAvatarPath } from "../Utils/userUtils.js";
import { sendEmail } from "../Utils/emailUtils.js";
import { generateResetToken, verifyGoogleToken } from "../Utils/authUtils.js";

export const register = async (req, res) => {
  const { registrationMethod, ...registrationData } = req.body;

  try {
    if (registrationMethod === "email") {
      const { password, email, username } = registrationData;

      // Validate email format using regex
      const isEmail = /\S+@\S+\.\S+/.test(email);

      if (!isEmail) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Check if the email is already used
      const existingEmail = await pool.query(
        `SELECT * FROM "BigBrainWeatherPlays".users WHERE email = $1`,
        [email]
      );

      if (existingEmail.rows.length > 0) {
        return res.status(409).json({ error: "Email already in use" });
      }

      // Check if the username is already used
      const existingUser = await pool.query(
        `SELECT * FROM "BigBrainWeatherPlays".users WHERE username = $1`,
        [username]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).json({ error: "Username already exists" });
      }

      // Hash the password and create user
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await pool.query(
        `INSERT INTO "BigBrainWeatherPlays".users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING *`,
        [username, hashedPassword, email]
      );

      res.status(201).json(newUser.rows[0]);
    } else if (registrationMethod === "google") {
      // Handle Google registration
      const { clientId, credential } = registrationData;

      // Verify the Google JWT token
      const payload = await verifyGoogleToken(clientId, credential);

      const email = payload.email;
      const username = payload.name;
      const avatar = payload.picture;
      const password_hash = "Google Auth";

      // Check if the email is already used
      const existingEmail = await pool.query(
        `SELECT * FROM "BigBrainWeatherPlays".users WHERE email = $1`,
        [email]
      );

      if (existingEmail.rows.length > 0) {
        return res.status(409).json({ error: "Email already in use" });
      }

      // Create a new user with Google information
      const newUser = await pool.query(
        `INSERT INTO "BigBrainWeatherPlays".users (username, password_hash, email, avatar) VALUES ($1, $2, $3, $4) RETURNING *`,
        [username, password_hash, email, avatar]
      );

      return res.status(201).json(newUser.rows[0]);
    }
  } catch (error) {
    console.error("Error in registration endpoint:", error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { loginMethod, ...loginData } = req.body;

  try {
    if (loginMethod === "email") {
      const { email, password } = loginData;

      // Validate email format using regex
      const isEmail = /\S+@\S+\.\S+/.test(email);

      if (!isEmail) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Adjust the query to check the email field
      const userResult = await pool.query(
        `SELECT * FROM "BigBrainWeatherPlays".users WHERE email = $1`,
        [email]
      );

      const user = userResult.rows[0];

      if (user) {
        // Compare the hashed password
        const match = await bcrypt.compare(password, user.password_hash);

        if (match) {
          // Create a token
          const token = jsonwebtoken.sign(
            { user_id: user.user_id }, // payload
            process.env.JWT_SECRET, // secret key
            { expiresIn: "1h" } // options
          );

          res.json({
            token: token,
            avatar: user.avatar,
          });
        } else {
          // Passwords do not match
          res.status(401).json({ error: "Invalid credentials" });
        }
      } else {
        // User not found
        res.status(404).json({ error: "User not found" });
      }
    } else if (loginMethod === "google") {
      const { clientId, credential } = loginData;

      // Verify the Google JWT token
      const payload = await verifyGoogleToken(clientId, credential);

      // Check if the user with the Google email exists in your database
      const email = payload.email;
      const userResult = await pool.query(
        `SELECT * FROM "BigBrainWeatherPlays".users WHERE email = $1`,
        [email]
      );

      const user = userResult.rows[0];

      if (user) {
        // User exists, generate a token for the user
        const token = jsonwebtoken.sign(
          { user_id: user.user_id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.json({
          token: token,
          avatar: user.avatar,
        });
      } else {
        // User not found, you can handle this as needed
        res.status(404).json({ error: "User not found" });
      }
    }
  } catch (error) {
    // Handle errors

    res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const userId = payload.user_id;

    // Fetch user profile from the database using userId
    const userResult = await pool.query(
      'SELECT * FROM "BigBrainWeatherPlays".users WHERE user_id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    const userProfile = {
      username: user.username,
      email: user.email, // Use email instead of phone
      avatar: user.avatar,
    };

    res.json(userProfile);
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { email } = req.body; // Change to use 'email' instead of 'contact'
    const user_id = req.user.user_id;

    // Validate email format using regex
    const isEmail = /\S+@\S+\.\S+/.test(email);

    if (!isEmail) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if the email is already used
    const existingEmail = await pool.query(
      `SELECT * FROM "BigBrainWeatherPlays".users WHERE email = $1`,
      [email]
    );

    if (existingEmail.rows.length > 0) {
      return res.status(409).json({ error: `This email is already in use` });
    }

    // Update the email information
    const query = `UPDATE "BigBrainWeatherPlays".users SET email = $1 WHERE user_id = $2 RETURNING *`;
    const result = await pool.query(query, [email, user_id]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserAvatar = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const currentUserResult = await pool.query(
      'SELECT avatar FROM "BigBrainWeatherPlays".users WHERE user_id = $1',
      [user_id]
    );
    const oldAvatarPath = currentUserResult.rows[0].avatar;
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

    if (req.file && oldAvatarPath) {
      const oldAvatarAbsolutePath = path.join(
        UPLOADS_FOLDER,
        oldAvatarPath.replace("/uploads/", "")
      );
      if (fs.existsSync(oldAvatarAbsolutePath)) {
        fs.unlinkSync(oldAvatarAbsolutePath); // Use fs.unlinkSync to delete the old avatar
      }
    }

    await updateAvatarPath(user_id, avatarPath, res);

    // Return a success response
    res
      .status(200)
      .json({ message: "Avatar updated successfully", avatar: avatarPath });
  } catch (error) {
    console.error("Error during avatar update:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUserContact = async (req, res) => {
  try {
    const { email } = req.body; // Use 'email' instead of 'contact'
    const user_id = req.user.user_id;

    // Validate email format using regex
    const isEmail = /\S+@\S+\.\S+/.test(email);

    if (!isEmail) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if the email is already used
    const existingEmail = await pool.query(
      `SELECT * FROM "BigBrainWeatherPlays".users WHERE email = $1`,
      [email]
    );

    if (existingEmail.rows.length > 0) {
      return res.status(409).json({ error: `This email is already in use` });
    }

    // Update the email information
    const query = `UPDATE "BigBrainWeatherPlays".users SET email = $1 WHERE user_id = $2 RETURNING *`;
    const result = await pool.query(query, [email, user_id]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user_id = req.user.user_id;

    // Fetch the current password hash from the database
    const userResult = await pool.query(
      'SELECT password_hash FROM "BigBrainWeatherPlays".users WHERE user_id = $1',
      [user_id]
    );

    const currentHashedPassword = userResult.rows[0]?.password_hash;

    // Check if the new password is the same as the current one
    const isSamePassword = await bcrypt.compare(
      password,
      currentHashedPassword
    );
    if (isSamePassword) {
      return res.status(400).json({
        error: "New password cannot be the same as the current password.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password
    const result = await pool.query(
      `UPDATE "BigBrainWeatherPlays".users SET password_hash = $1 WHERE user_id = $2 RETURNING user_id`,
      [hashedPassword, user_id]
    );

    res.status(200).json({
      message: "Password updated successfully",
      user_id: result.rows[0].user_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const user_id = req.user.user_id;

    // Check if the username is already taken
    const existingUser = await pool.query(
      `SELECT * FROM "BigBrainWeatherPlays".users WHERE username = $1`,
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "Username already taken" });
    }

    // Update the username
    const result = await pool.query(
      `UPDATE "BigBrainWeatherPlays".users SET username = $1 WHERE user_id = $2 RETURNING *`,
      [username, user_id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email format using regex
    const isEmail = /\S+@\S+\.\S+/.test(email);

    if (!isEmail) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if the user exists
    const userResult = await pool.query(
      `SELECT * FROM "BigBrainWeatherPlays".users WHERE email = $1`,
      [email]
    );

    const message =
      "If we find an account with that email, we'll send a reset link.";

    if (userResult.rows.length > 0) {
      // Generate a secure token
      const resetToken = await generateResetToken();

      // Set token expiration time (e.g., 1 hour)
      const expireTime = new Date();
      expireTime.setHours(expireTime.getHours() + 1);

      // Save the token and expiration time in the database
      await pool.query(
        `UPDATE "BigBrainWeatherPlays".users SET reset_password_token = $1, reset_token_expires = $2 WHERE email = $3`,
        [resetToken, expireTime, email]
      );

      // Prepare the email message
      const resetUrl = `http://localhost:5173/password-reset/${resetToken}`;
      const emailMessage = `Your password reset link is: ${resetUrl}`;

      await sendEmail(email, "Password Reset", emailMessage);
    }

    res.status(200).json({ message: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validate and update the password
    const userResult = await pool.query(
      `SELECT * FROM "BigBrainWeatherPlays".users WHERE reset_password_token = $1 AND reset_token_expires > NOW()`,
      [token]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).send("Invalid or expired token");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `UPDATE "BigBrainWeatherPlays".users SET password_hash = $1, reset_password_token = NULL, reset_token_expires = NULL WHERE user_id = $2`,
      [hashedPassword, userResult.rows[0].user_id]
    );

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
