// index.mjs
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 1. 首页测试（访问域名时看到）
app.get('/', (req, res) => {
  res.send('小琪后端已在阿里云上线！');
});

// 2. 你的聊天接口（复制你原来的逻辑）
app.post('/chat', (req, res) => {
  const { message } = req.body;
  res.json({ 
    success: true, 
    reply: `收到：“${message}”。我是小琪，连接成功！` 
  });
});

// 3. 阿里云函数计算要求的出口
export const handler = function (req, res, context) {
  const server = createServer(app);
  server.emit('request', req, res);
};
