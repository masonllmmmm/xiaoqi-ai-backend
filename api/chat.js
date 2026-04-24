const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Vercel 会自动将 api/chat.js 映射为 /api/chat
app.post('/', (req, res) => {
  const { message, userId, mode } = req.body;
  res.json({
    success: true,
    reply: `收到：“${message}”。我是小琪，现在连接成功！`
  });
});

module.exports = app;
