// 引入依赖
const express = require('express');
const cors = require('cors');
const app = express();

// 中间件
app.use(cors()); // 解决跨域问题
app.use(express.json()); // 解析 JSON 请求体

// 健康检查接口（用于测试后端是否存活）
app.get('/', (req, res) => {
  res.send('Xiaoqi Backend is running!');
});

// 聊天接口
app.post('/api/chat', (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: '消息不能为空' });
    }

    // 简单的回复逻辑（后续可以接大模型）
    const reply = `你刚才说：“${message}”。我是小琪，目前处于测试阶段。`;
    
    res.json({
      success: true,
      reply: reply
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 导出给 Vercel 使用（必须）
module.exports = app;
