import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM staff ORDER BY display_order ASC"
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch staff"
        });
    }
});

export default router;