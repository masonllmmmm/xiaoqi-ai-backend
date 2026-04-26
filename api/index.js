const express = require('express');
const cors = require('cors');

module.exports = (req, res) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // ✅ 必须添加：处理根路径的 GET 请求（访问域名时触发）
  app.get('/', (req, res) => {
    res.send('小琪 AI 后端运行中！'); // 返回简单文本，证明服务存活
  });

  // 你的聊天接口（保持不变）
  app.post('/chat', (req, res) => {
    const { message } = req.body;
    res.json({
      success: true,
      reply: `收到：“${message}”。我是小琪，连接成功！`
    });
  });

  app(req, res); // 交给 Vercel 处理请求
};
