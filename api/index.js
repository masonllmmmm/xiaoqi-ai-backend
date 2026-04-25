const express = require('express');
const cors = require('cors');

// Vercel 会自动把 api/index.js 映射为 /api
module.exports = (req, res) => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // 健康检查
  app.get('/', (req, res) => res.send('OK'));

  // 聊天接口
  app.post('/chat', (req, res) => {
    const { message } = req.body;
    res.json({
      success: true,
      reply: `收到：“${message}”。我是小琪，连接成功！`
    });
  });

  // 交给 Vercel
  app(req, res);
};
