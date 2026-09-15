import express from "express";
import db from "../config/database.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


// GET ALL
// Public + Admin
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM home_sections ORDER BY id ASC"
        );

        res.json(rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch home sections"
        });
    }
});


// GET ONE
// Public + Admin
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


// CREATE
// Admin only
router.post("/", authenticateAdmin, async (req, res) => {
    const {
        section_key,
        eyebrow,
        title,
        title_highlight,
        description,
        button_text,
        button_link
    } = req.body;

    if (!section_key) {
        return res.status(400).json({
            message: "Section key is required"
        });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO home_sections
            (
                section_key,
                eyebrow,
                title,
                title_highlight,
                description,
                button_text,
                button_link
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                section_key,
                eyebrow || null,
                title || null,
                title_highlight || null,
                description || null,
                button_text || null,
                button_link || null
            ]
        );

        const [rows] = await db.query(
            "SELECT * FROM home_sections WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json(rows[0]);

    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Section key already exists"
            });
        }

        res.status(500).json({
            message: "Failed to create home section"
        });
    }
});


// UPDATE
// Admin only
router.put("/:sectionKey", authenticateAdmin, async (req, res) => {
    const { sectionKey } = req.params;

    const {
        eyebrow,
        title,
        title_highlight,
        description,
        button_text,
        button_link
    } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE home_sections
             SET eyebrow = ?,
                 title = ?,
                 title_highlight = ?,
                 description = ?,
                 button_text = ?,
                 button_link = ?
             WHERE section_key = ?`,
            [
                eyebrow || null,
                title || null,
                title_highlight || null,
                description || null,
                button_text || null,
                button_link || null,
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


// DELETE
// Admin only
router.delete("/:sectionKey", authenticateAdmin, async (req, res) => {
    const { sectionKey } = req.params;

    try {
        const [result] = await db.query(
            "DELETE FROM home_sections WHERE section_key = ?",
            [sectionKey]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Home section not found"
            });
        }

        res.json({
            message: "Home section deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete home section"
        });
    }
});


export default router;