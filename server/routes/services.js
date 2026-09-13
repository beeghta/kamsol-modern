import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM services"
        );

        res.json(rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch services"
        });
    }
});
router.get("/:id", (req, res) => {
    const serviceId = Number(req.params.id);

    const service = services.find(
        (service) => service.id === serviceId
    );

    if (!service) {
        return res.status(404).json({
            message: "Service not found"
        });
    }

    res.json(service);
});
router.post("/", async (req, res) => {
    try {
        const { category, title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO services (category, title, description)
             VALUES (?, ?, ?)`,
            [
                category || "General",
                title,
                description
            ]
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
router.put("/:id", async (req, res) => {
    try {
        const serviceId = Number(req.params.id);
        const { category, title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const [result] = await db.query(
            `UPDATE services
             SET category = ?, title = ?, description = ?
             WHERE id = ?`,
            [
                category,
                title,
                description,
                serviceId
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        const [rows] = await db.query(
            "SELECT * FROM services WHERE id = ?",
            [serviceId]
        );

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update service"
        });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const serviceId = Number(req.params.id);

        const [result] = await db.query(
            "DELETE FROM services WHERE id = ?",
            [serviceId]
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