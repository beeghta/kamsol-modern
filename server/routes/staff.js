import express from "express";

import db from "../config/database.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();


// PUBLIC
// GET staff
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT *
             FROM staff
             ORDER BY display_order ASC`
        );

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch staff"
        });
    }
});


// ADMIN
// CREATE
router.post("/", authenticateAdmin, async (req, res) => {
    const {
        name,
        position,
        image,
        bio,
        email,
        phone,
        display_order
    } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Name is required"
        });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO staff
                (name, position, image, bio, email, phone, display_order)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                position || null,
                image || null,
                bio || null,
                email || null,
                phone || null,
                display_order ?? 0
            ]
        );

        const [rows] = await db.query(
            "SELECT * FROM staff WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create staff member"
        });
    }
});


// ADMIN
// UPDATE
router.put("/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;

    const {
        name,
        position,
        image,
        bio,
        email,
        phone,
        display_order
    } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE staff
             SET name = ?,
                 position = ?,
                 image = ?,
                 bio = ?,
                 email = ?,
                 phone = ?,
                 display_order = ?
             WHERE id = ?`,
            [
                name,
                position || null,
                image || null,
                bio || null,
                email || null,
                phone || null,
                display_order ?? 0,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Staff member not found"
            });
        }

        const [rows] = await db.query(
            "SELECT * FROM staff WHERE id = ?",
            [id]
        );

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update staff member"
        });
    }
});


// ADMIN
// DELETE
router.delete("/:id", authenticateAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            "DELETE FROM staff WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Staff member not found"
            });
        }

        res.json({
            message: "Staff member deleted"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete staff member"
        });
    }
});

export default router;