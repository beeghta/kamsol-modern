import express from "express";
import db from "../config/database.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


// =========================
// CREATE MESSAGE
// Public
// =========================

router.post("/", async (req, res) => {

    const {
        name,
        email,
        phone,
        message
    } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            message: "Name, email and message are required"
        });
    }

    try {

        const [result] = await db.query(
            `INSERT INTO contact_messages
            (name, email, phone, message)
            VALUES (?, ?, ?, ?)`,
            [
                name,
                email,
                phone || null,
                message
            ]
        );

        const [rows] = await db.query(
            `SELECT *
             FROM contact_messages
             WHERE id = ?`,
            [result.insertId]
        );

        res.status(201).json(rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to save contact message"
        });
    }
});


// =========================
// GET ALL MESSAGES
// Admin only
// =========================

router.get("/", authenticateAdmin, async (req, res) => {

    try {

        const [rows] = await db.query(
            `SELECT *
             FROM contact_messages
             ORDER BY created_at DESC`
        );

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch contact messages"
        });
    }
});


// =========================
// GET SINGLE MESSAGE
// Admin only
// =========================

router.get("/:id", authenticateAdmin, async (req, res) => {

    const { id } = req.params;

    try {

        const [rows] = await db.query(
            `SELECT *
             FROM contact_messages
             WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch message"
        });
    }
});


// =========================
// DELETE MESSAGE
// Admin only
// =========================

router.delete("/:id", authenticateAdmin, async (req, res) => {

    const { id } = req.params;

    try {

        const [result] = await db.query(
            `DELETE FROM contact_messages
             WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        res.json({
            message: "Message deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete message"
        });
    }
});


export default router;