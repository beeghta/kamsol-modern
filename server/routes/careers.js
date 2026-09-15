import express from "express";
import db from "../config/database.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


// =========================
// GET ALL CAREERS
// Public + Admin
// =========================

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


// =========================
// GET SINGLE CAREER
// Public + Admin
// =========================

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {

        const [careers] = await db.query(
            `SELECT *
             FROM career_postings
             WHERE id = ?`,
            [id]
        );

        if (careers.length === 0) {
            return res.status(404).json({
                message: "Career posting not found"
            });
        }

        const career = careers[0];

        const [competencies] = await db.query(
            `SELECT id, content, display_order
             FROM career_competencies
             WHERE career_id = ?
             ORDER BY display_order ASC`,
            [id]
        );

        const [tasks] = await db.query(
            `SELECT id, content, display_order
             FROM career_tasks
             WHERE career_id = ?
             ORDER BY display_order ASC`,
            [id]
        );

        career.competencies = competencies;
        career.tasks = tasks;

        res.json(career);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch career posting"
        });
    }
});


// =========================
// CREATE CAREER
// Admin only
// =========================

router.post("/", authenticateAdmin, async (req, res) => {

    const {
        title,
        contact_name,
        posted_date,
        member_type,
        employment_type,
        travel,
        closing_date,
        website,
        contact_city,
        contact_province,
        contact_email,
        job_description,
        competencies = [],
        tasks = []
    } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Job title is required"
        });
    }

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const [result] = await connection.query(
            `INSERT INTO career_postings
            (
                title,
                contact_name,
                posted_date,
                member_type,
                employment_type,
                travel,
                closing_date,
                website,
                contact_city,
                contact_province,
                contact_email,
                job_description
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                contact_name || null,
                posted_date || null,
                member_type || null,
                employment_type || null,
                travel || null,
                closing_date || null,
                website || null,
                contact_city || null,
                contact_province || null,
                contact_email || null,
                job_description || null
            ]
        );

        const careerId = result.insertId;

        for (let i = 0; i < competencies.length; i++) {

            if (!competencies[i]?.content?.trim()) {
                continue;
            }

            await connection.query(
                `INSERT INTO career_competencies
                (career_id, content, display_order)
                VALUES (?, ?, ?)`,
                [
                    careerId,
                    competencies[i].content.trim(),
                    i
                ]
            );
        }

        for (let i = 0; i < tasks.length; i++) {

            if (!tasks[i]?.content?.trim()) {
                continue;
            }

            await connection.query(
                `INSERT INTO career_tasks
                (career_id, content, display_order)
                VALUES (?, ?, ?)`,
                [
                    careerId,
                    tasks[i].content.trim(),
                    i
                ]
            );
        }

        await connection.commit();

        const [rows] = await connection.query(
            `SELECT *
             FROM career_postings
             WHERE id = ?`,
            [careerId]
        );

        res.status(201).json(rows[0]);

    } catch (error) {

        await connection.rollback();

        console.error(error);

        res.status(500).json({
            message: "Failed to create career posting"
        });

    } finally {
        connection.release();
    }
});


// =========================
// UPDATE CAREER
// Admin only
// =========================

router.put("/:id", authenticateAdmin, async (req, res) => {

    const { id } = req.params;

    const {
        title,
        contact_name,
        posted_date,
        member_type,
        employment_type,
        travel,
        closing_date,
        website,
        contact_city,
        contact_province,
        contact_email,
        job_description,
        competencies = [],
        tasks = []
    } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Job title is required"
        });
    }

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const [result] = await connection.query(
            `UPDATE career_postings
             SET
                title = ?,
                contact_name = ?,
                posted_date = ?,
                member_type = ?,
                employment_type = ?,
                travel = ?,
                closing_date = ?,
                website = ?,
                contact_city = ?,
                contact_province = ?,
                contact_email = ?,
                job_description = ?
             WHERE id = ?`,
            [
                title,
                contact_name || null,
                posted_date || null,
                member_type || null,
                employment_type || null,
                travel || null,
                closing_date || null,
                website || null,
                contact_city || null,
                contact_province || null,
                contact_email || null,
                job_description || null,
                id
            ]
        );

        if (result.affectedRows === 0) {
            await connection.rollback();

            return res.status(404).json({
                message: "Career posting not found"
            });
        }

        // Replace competencies
        await connection.query(
            `DELETE FROM career_competencies
             WHERE career_id = ?`,
            [id]
        );

        for (let i = 0; i < competencies.length; i++) {

            if (!competencies[i]?.content?.trim()) {
                continue;
            }

            await connection.query(
                `INSERT INTO career_competencies
                (career_id, content, display_order)
                VALUES (?, ?, ?)`,
                [
                    id,
                    competencies[i].content.trim(),
                    i
                ]
            );
        }

        // Replace tasks
        await connection.query(
            `DELETE FROM career_tasks
             WHERE career_id = ?`,
            [id]
        );

        for (let i = 0; i < tasks.length; i++) {

            if (!tasks[i]?.content?.trim()) {
                continue;
            }

            await connection.query(
                `INSERT INTO career_tasks
                (career_id, content, display_order)
                VALUES (?, ?, ?)`,
                [
                    id,
                    tasks[i].content.trim(),
                    i
                ]
            );
        }

        await connection.commit();

        const [rows] = await connection.query(
            `SELECT *
             FROM career_postings
             WHERE id = ?`,
            [id]
        );

        res.json(rows[0]);

    } catch (error) {

        await connection.rollback();

        console.error(error);

        res.status(500).json({
            message: "Failed to update career posting"
        });

    } finally {
        connection.release();
    }
});


// =========================
// DELETE CAREER
// Admin only
// =========================

router.delete("/:id", authenticateAdmin, async (req, res) => {

    const { id } = req.params;

    try {

        const [result] = await db.query(
            `DELETE FROM career_postings
             WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Career posting not found"
            });
        }

        res.json({
            message: "Career posting deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete career posting"
        });
    }
});


export default router;