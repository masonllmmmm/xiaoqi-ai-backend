const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 测试根路径（直接返回一个字符串，不做任何复杂处理）
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// 聊天接口（极度简化）
app.post('/api/chat', (req, res) => {
  res.status(200).json({ reply: '测试回复' });
});

module.exports = app;
