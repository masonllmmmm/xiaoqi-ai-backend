const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 静态文件服务（提供前端页面）
app.use(express.static(path.join(__dirname, '../public')));

// 导入路由
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// 健康检查接口
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: '小琪智能助手后端',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// 404处理
app.use((req, res) => {
    res.status(404).json({ error: '接口不存在' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 小琪智能助手后端已启动，端口：${PORT}`);
    console.log(`📡 API地址：http://localhost:${PORT}/api`);
    console.log(`🌐 前端地址：http://localhost:${PORT}`);
});