import express from "express";
import { staff } from "../data/staff.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(staff);
});

router.get("/:id", (req, res) => {
    const staffId = Number(req.params.id);

    const member = staff.find(
        (member) => member.id === staffId
    );

    if (!member) {
        return res.status(404).json({
            message: "Staff member not found"
        });
    }

    res.json(member);
});

export default router;