// controllers/toolsController.js

exports.formatJson = (req, res) => {
  const { text } = req.body;
  try {
    const parsed = JSON.parse(text);
    const formatted = JSON.stringify(parsed, null, 2);
    res.json({ result: formatted });
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON" });
  }
};

exports.encodeBase64 = (req, res) => {
  const { text } = req.body;
  try {
    const encoded = Buffer.from(text, "utf-8").toString("base64");
    res.json({ result: encoded });
  } catch (error) {
    res.status(400).json({ error: "Encoding failed" });
  }
};

exports.decodeBase64 = (req, res) => {
  const { text } = req.body;
  try {
    const decoded = Buffer.from(text, "base64").toString("utf-8");
    res.json({ result: decoded });
  } catch (error) {
    res.status(400).json({ error: "Decoding failed" });
  }
};
