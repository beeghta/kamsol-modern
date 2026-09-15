import express from "express";
import db from "../config/database.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET — public + admin
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT *
             FROM services
             ORDER BY id ASC`
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch services"
        });
    }
});

// POST — admin only
router.post("/", authenticateAdmin, async (req, res) => {
    const {
        category,
        title,
        description
    } = req.body;

    if (!category || !title || !description) {
        return res.status(400).json({
            message: "Category, title and description are required"
        });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO services
             (category, title, description)
             VALUES (?, ?, ?)`,
            [category, title, description]
        );

        const [rows] = await db.query(
            "SELECT * FROM services WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create service"
        });
    }
});

// PUT — admin only
router.put("/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;

    const {
        category,
        title,
        description
    } = req.body;

    if (!category || !title || !description) {
        return res.status(400).json({
            message: "Category, title and description are required"
        });
    }

    try {
        const [result] = await db.query(
            `UPDATE services
             SET category = ?,
                 title = ?,
                 description = ?
             WHERE id = ?`,
            [category, title, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        const [rows] = await db.query(
            "SELECT * FROM services WHERE id = ?",
            [id]
        );

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update service"
        });
    }
});

// DELETE — admin only
router.delete("/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            "DELETE FROM services WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.json({
            message: "Service deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete service"
        });
    }
});

export default router;