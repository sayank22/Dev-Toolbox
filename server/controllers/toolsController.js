const FormattedJson = require('../models/FormattedJson');

exports.formatJson = async (req, res) => {
  const { text } = req.body;
  try {
    const parsed = JSON.parse(text);
    const formatted = JSON.stringify(parsed, null, 2);

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

exports.deleteJsonHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await FormattedJson.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        error: "History entry not found",
      });
    }

    res.json({
      message: "History entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete history entry",
    });
  }
};

exports.clearJsonHistory = async (req, res) => {
  try {
    await FormattedJson.deleteMany({});

    res.json({
      message: "History cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to clear history",
    });
  }
};
