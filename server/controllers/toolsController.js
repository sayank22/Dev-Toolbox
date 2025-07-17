const FormattedJson = require('../models/FormattedJson');

exports.formatJson = async (req, res) => {
  const { text } = req.body;
  try {
    const parsed = JSON.parse(text);
    const formatted = JSON.stringify(parsed, null, 2);

    // Save to MongoDB
    await FormattedJson.create({
      originalJson: text,
      formattedJson: formatted,
    });

    res.json({ result: formatted });
  } catch (error) {
    res.status(400).json({ error: 'Invalid JSON' });
  }
};

exports.encodeBase64 = (req, res) => {
  const { text } = req.body;
  try {
    const encoded = Buffer.from(text, 'utf-8').toString('base64');
    res.json({ result: encoded });
  } catch (error) {
    res.status(400).json({ error: 'Encoding failed' });
  }
};

exports.decodeBase64 = (req, res) => {
  const { text } = req.body;
  try {
    if (!text) return res.status(400).json({ error: 'No text provided' });

    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    if (!base64Regex.test(text)) {
      return res.status(400).json({ error: 'Invalid base64 input' });
    }

    const decoded = Buffer.from(text, 'base64').toString('utf-8');
    res.json({ result: decoded });
  } catch (error) {
    res.status(400).json({ error: 'Decoding failed' });
  }
};

// New controller to get JSON history
exports.getJsonHistory = async (req, res) => {
  try {
    const history = await FormattedJson.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch JSON history' });
  }
};
