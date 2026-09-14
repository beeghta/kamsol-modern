import express from "express";
import cors from "cors";
import db from "./config/database.js";
import staffRouter from "./routes/staff.js";
import contactRouter from "./routes/contact.js";

import servicesRouter from "./routes/services.js";
import buildingTaxonomyRouter from "./routes/buildingTaxonomy.js";
import homeSectionsRouter from "./routes/homeSections.js";
import careersRouter from "./routes/careers.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/staff", staffRouter);
app.use("/api/contact", contactRouter);
app.use("/api/home-sections", homeSectionsRouter);
app.use("/api/careers", careersRouter);
app.get("/", (req, res) => {
    res.json({
        message: "Kamsol API is running"
    });
});

app.use("/api/services", servicesRouter);
app.use("/api/building-taxonomy", buildingTaxonomyRouter);

const PORT = 3001;

try {
    const connection = await db.getConnection();

    console.log("MySQL connected successfully");

    connection.release();
} catch (error) {
    console.error("MySQL connection failed:", error.message);
}
app.listen(PORT, () => {
    console.log(`Kamsol API running on http://localhost:${PORT}`);
});