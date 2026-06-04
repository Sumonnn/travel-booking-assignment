const express = require("express");

const {
    addPackage,
    getAllPackages,
    getSinglePackage,
} = require("../controllers/package.controller");

const router = express.Router();

router.post("/", addPackage);
router.get("/", getAllPackages);
router.get("/:id", getSinglePackage);

module.exports = router;