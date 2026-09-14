import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [careers] = await db.query(
            `SELECT *
             FROM career_postings
             ORDER BY posted_date DESC`
        );

        for (const career of careers) {
            const [competencies] = await db.query(
                `SELECT id, content, display_order
                 FROM career_competencies
                 WHERE career_id = ?
                 ORDER BY display_order ASC`,
                [career.id]
            );

            const [tasks] = await db.query(
                `SELECT id, content, display_order
                 FROM career_tasks
                 WHERE career_id = ?
                 ORDER BY display_order ASC`,
                [career.id]
            );

            career.competencies = competencies;
            career.tasks = tasks;
        }

        res.json(careers);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch career postings"
        });
    }
});

export default router;