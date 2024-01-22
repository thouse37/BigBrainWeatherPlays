import nodemailer from "nodemailer";
import pool from "../config/db.js";

export const sendEmail = async (email, subject, text) => {
  try {
    console.log(`Preparing to send email to ${email}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to get email subscriptions with user emails
export const getEmailSubscriptionsWithUserEmails = async () => {
  // Step 1: Retrieve data from email_subscriptions
  const emailSubscriptionsQuery = `
      SELECT * FROM "BigBrainWeatherPlays".email_subscriptions
    `;
  const emailSubscriptionsResult = await pool.query(emailSubscriptionsQuery);

  // Step 2: Iterate through the result set and fetch user emails
  const emailSubscriptionsWithUserEmails = await Promise.all(
    emailSubscriptionsResult.rows.map(async (row) => {
      const { user_id, notification_settings } = row;
      const userQuery = `
          SELECT email FROM "BigBrainWeatherPlays".users
          WHERE user_id = $1
        `;
      const userResult = await pool.query(userQuery, [user_id]);

      if (userResult.rows.length > 0) {
        const userEmail = userResult.rows[0].email;
        return {
          user_id,
          notification_settings,
          email: userEmail,
        };
      }

      return null;
    })
  );

  // Filter out null values (users not found in the users table)
  const filteredEmailSubscriptions = emailSubscriptionsWithUserEmails.filter(
    (subscription) => subscription !== null
  );

  return filteredEmailSubscriptions;
};
