const express = require('express');
const cors = require('cors');

module.exports = (req, res) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post('/chat', (req, res) => {
    res.json({ success: true, reply: '我是小琪，连接成功！' });
  });

  app(req, res);
};
