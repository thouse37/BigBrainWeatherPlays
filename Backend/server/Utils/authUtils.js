import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

export const generateResetToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString("hex"));
    });
  });
};

export const verifyGoogleToken = async (clientId, jwtToken) => {
  const client = new OAuth2Client(clientId);

  try {
    const ticket = await client.verifyIdToken({
      idToken: jwtToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    return payload;
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw error;
  }
};
