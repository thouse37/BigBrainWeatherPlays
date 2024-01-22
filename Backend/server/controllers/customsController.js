import pool from "../config/db.js";

export const getFavoriteTeams = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT team_name FROM "BigBrainWeatherPlays".favorite_teams WHERE user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveFavoriteTeams = async (req, res) => {
  try {
    const { selectedTeams } = req.body;
    const userId = req.user.user_id;
    console.log(selectedTeams);

    await pool.query(
      `DELETE FROM "BigBrainWeatherPlays".favorite_teams WHERE user_id = $1`,
      [userId]
    );

    for (const teamName of selectedTeams) {
      await pool.query(
        `INSERT INTO "BigBrainWeatherPlays".favorite_teams (team_name, user_id) VALUES ($1, $2)`,
        [teamName, userId]
      );
    }

    res.status(201).json({ message: "Favorite teams updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
