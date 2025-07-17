const express = require('express');
const router = express.Router();

const {
  formatJson,
  encodeBase64,
  decodeBase64,
  getJsonHistory,
} = require('../controllers/toolsController');

router.post('/format-json', formatJson);
router.post('/encode', encodeBase64);
router.post('/decode', decodeBase64);
router.get('/json-history', getJsonHistory);

module.exports = router;
