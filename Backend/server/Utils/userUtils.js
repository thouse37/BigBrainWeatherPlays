import pool from "../config/db.js";

export const updateAvatarPath = async (user_id, avatarPath) => {
  const query =
    'UPDATE "BigBrainWeatherPlays".users SET avatar = $1 WHERE user_id = $2 RETURNING *';
  const values = [avatarPath, user_id];

  try {
    const updateUserResult = await pool.query(query, values);
    return updateUserResult.rows[0];
  } catch (error) {
    throw new Error("Error updating avatar path: " + error.message);
  }
};
