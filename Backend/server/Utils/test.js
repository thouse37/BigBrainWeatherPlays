import pool from "../config/db.js";

export const getEmailSubscriptionsUsers = async () => {
  const result = await pool.query(
    `SELECT * FROM "BigBrainWeatherPlays".email_subscriptions`
  );

  console.log(result);
};

getEmailSubscriptionsUsers();
