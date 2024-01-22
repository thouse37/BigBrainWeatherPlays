// Import necessary modules
import schedule from "node-cron";
import { getEmailSubscriptionsWithUserEmails, sendEmail } from "./emailUtils";
import { fetchGames } from "./gameData";

// Define a function to check game times and send notifications
async function checkGameTimesAndSendNotifications() {
  try {
    const currentTime = new Date();

    const games = await fetchGames();

    // Get email subscriptions with user emails and notification settings
    const users = await getEmailSubscriptionsWithUserEmails();

    console.log(
      "Users with email subscriptions and notification settings:",
      users
    );

    for (const game of games) {
      const timeDiff = game.startTime - currentTime;

      for (const user of users) {
        if (
          timeDiff >= 0 &&
          timeDiff <= user.notification_settings * 60 * 1000
        ) {
          // Send email notification to the user
          const emailContent = `Game ${game.name} is starting soon! Don't miss it.`;
          console.log(`Sending email to ${user.email}: ${emailContent}`);
          await sendEmail(user.email, "Game Notification", emailContent);
        }
      }
    }
  } catch (error) {
    console.error(
      "Error checking game times and sending notifications:",
      error
    );
  }
}

// Schedule the script to run periodically (e.g., every minute)
schedule.schedule("*/1 * * * *", checkGameTimesAndSendNotifications);
