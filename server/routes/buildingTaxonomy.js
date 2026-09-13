import express from "express";
import { buildingTaxonomy } from "../data/buildingTaxonomy.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(buildingTaxonomy);
});

export default router;