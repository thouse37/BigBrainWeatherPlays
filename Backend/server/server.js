import express from "express";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import nflRoutes from "./routes/nflRoutes.js";
import customRoutes from "./routes/customRoutes.js";
import { errorHandler } from "./middleware/errorHandlingMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());

// Static files middleware if you serve uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", userRoutes);
app.use("/api", emailRoutes);
app.use("/api/nfl", nflRoutes);
app.use("/api", customRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
