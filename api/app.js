const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 健康检查
app.get('/', (req, res) => res.send('OK'));

// 聊天接口 - 注意路径要和前端一致
app.post('/chat', (req, res) => {
  const { message, userId, mode } = req.body;
  
  // 简单回复逻辑
  let reply = `收到消息：“${message}”（用户ID：${userId}，模式：${mode}）。我是小琪，正在为您服务！`;
  
  res.json({
    success: true,
    reply: reply
  });
});

module.exports = app;
