import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Name, email and message are required"
            });
        }

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

        res.status(201).json({
            message: "Your message has been received successfully",
            id: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to submit contact message"
        });
    }
});

export default router;