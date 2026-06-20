const express = require('express');
const router = express.Router();

const {
  formatJson,
  encodeBase64,
  decodeBase64,
  getJsonHistory,
  deleteJsonHistory,
  clearJsonHistory,
} = require("../controllers/toolsController");

router.post('/format-json', formatJson);
router.post('/encode', encodeBase64);
router.post('/decode', decodeBase64);
router.get('/json-history', getJsonHistory);
router.delete("/json-history/:id", deleteJsonHistory);
router.delete("/json-history", clearJsonHistory);

module.exports = router;
