const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Xiaoqi Backend is running!');
});

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  res.json({
    success: true,
    reply: `收到：${userMessage}`
  });
});

// ⭐️ 确保有这一行
module.exports = app;
