const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 测试根路径
app.get('/', (req, res) => {
  res.send('Xiaoqi Backend is running!');
});

// 聊天接口
app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  res.json({
    success: true,
    reply: `收到：${userMessage}`
  });
});

module.exports = app;
