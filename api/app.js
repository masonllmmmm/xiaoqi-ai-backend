const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 健康检查
app.get('/', (req, res) => res.send('OK'));

// 聊天接口 - 必须和前端 fetch 的地址一致
app.post('/chat', (req, res) => {
  const { message, userId, mode } = req.body;
  
  // 简单回复逻辑
  let reply = `收到消息：“${message}”（用户ID：${userId}，模式：${mode}）。我是小琪，后端连接成功！`;
  
  res.json({
    success: true,
    reply: reply
  });
});

module.exports = app;
