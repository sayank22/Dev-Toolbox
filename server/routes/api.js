const express = require("express");
const router = express.Router();

// ✅ Make sure the path and export is correct
const {
  formatJson,
  encodeBase64,
  decodeBase64
} = require("../controllers/toolsController");

router.post("/format-json", formatJson);
router.post("/encode", encodeBase64);
router.post("/decode", decodeBase64);

module.exports = router;
