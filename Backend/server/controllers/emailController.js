import { sendEmail } from "../Utils/emailUtils.js";
import pool from "../config/db.js";

export const contactUs = async (req, res) => {
  try {
    const { name, email, comments } = req.body;

    // Assuming you want to send the message to bigbrainweatherplays@gmail.com
    const recipientEmail = "bigbrainweatherplays@gmail.com";
    const subject = "Contact Us Form Submission";

    // Compose the email text
    const emailText = `
          Name: ${name}
          Email: ${email}
          Comments:
          ${comments}
        `;

    // Send the email using the sendEmail function
    await sendEmail(recipientEmail, subject, emailText);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending contact form message:", error);
    res
      .status(500)
      .json({ message: "Failed to send message. Please try again later." });
  }
};

export const getEmailSubscriptions = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT * FROM "BigBrainWeatherPlays".email_subscriptions WHERE user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveEmailSubscription = async (req, res) => {
  try {
    const { selectedTeams } = req.body;
    const userId = req.user.user_id;

    await pool.query(
      `DELETE FROM "BigBrainWeatherPlays".email_subscriptions WHERE user_id = $1`,
      [userId]
    );

    for (const teamName of selectedTeams) {
      await pool.query(
        `INSERT INTO "BigBrainWeatherPlays".email_subscriptions (team_name, user_id) VALUES ($1, $2)`,
        [teamName, userId]
      );
    }

    res
      .status(201)
      .json({ message: "Email Subscriptions updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotificationSettings = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const result = await pool.query(
      'SELECT notification_settings FROM "BigBrainWeatherPlays".email_subscriptions WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      res.json({ notificationTime: 24 });
    } else {
      res.json({ notificationTime: result.rows[0].notification_settings });
    }
  } catch (error) {
    console.error("Error retrieving notification settings:", error);
    res.status(500).json({ error: "Failed to retrieve notification settings" });
  }
};

export const saveNotificationSettings = async (req, res) => {
  const userId = req.user.user_id;
  const { notificationTime } = req.body;
  try {
    await pool.query(
      'UPDATE "BigBrainWeatherPlays".email_subscriptions SET notification_settings = $1 WHERE user_id = $2',
      [notificationTime, userId]
    );
    res.json({ message: "Notification settings updated successfully" });
  } catch (error) {
    console.error("Error updating notification settings:", error);
    res.status(500).json({ error: "Failed to update notification settings" });
  }
};
