import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.get("/:sectionKey", async (req, res) => {
    const { sectionKey } = req.params;

    try {
        const [rows] = await db.query(
            "SELECT * FROM home_sections WHERE section_key = ?",
            [sectionKey]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Home section not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch home section"
        });
    }
});
router.put("/:sectionKey", async (req, res) => {
    const { sectionKey } = req.params;

    const {
        eyebrow,
        title,
        description,
        button_text,
        button_link
    } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE home_sections
             SET eyebrow = ?,
                 title = ?,
                 description = ?,
                 button_text = ?,
                 button_link = ?
             WHERE section_key = ?`,
            [
                eyebrow,
                title,
                description,
                button_text,
                button_link,
                sectionKey
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Home section not found"
            });
        }

        const [rows] = await db.query(
            "SELECT * FROM home_sections WHERE section_key = ?",
            [sectionKey]
        );

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update home section"
        });
    }
});
export default router;