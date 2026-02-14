import express from "express";
import societyRoutes from "./routes/societyRoutes.js";

const app = express();

app.use(express.json());

// base path set
app.use("/api/society", societyRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
