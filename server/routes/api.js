const express = require('express');
const router = express.Router();

// 存储对话历史（生产环境建议使用数据库）
let conversationHistory = {};

// 生成智能回复的核心函数
function generateSmartReply(userMessage, mode = 'dialogue') {
    const message = userMessage.toLowerCase();
    
    // 根据模式生成不同回复
    const replies = {
        dialogue: [
            `您说"${userMessage}"，这很有趣！我想听听您的更多想法。`,
            `关于"${userMessage}"，每个人都有自己的独特见解呢。`,
            `"${userMessage}"确实值得深入聊聊，您能具体说说吗？`,
            `我明白您的意思了，关于"${userMessage}"我有些想法想分享。`,
            `您提到的"${userMessage}"让我想到了一些相关的话题。`
        ],
        creation: [
            `关于"${userMessage}"的创作，我觉得可以从这几个角度入手...`,
            `创作"${userMessage}"需要灵感，让我帮您构思一下！`,
            `针对"${userMessage}"这个主题，我有以下创作建议：`,
            `创作是很有趣的过程！关于"${userMessage}"，我们可以这样展开：`,
            `"${userMessage}"是个不错的创作题材，我来帮您规划一下。`
        ],
        analysis: [
            `对于"${userMessage}"的分析，我需要从这几个维度来看：`,
            `分析"${userMessage}"需要考虑多方面因素，让我为您梳理：`,
            `关于"${userMessage}"的深度分析，我的专业见解是：`,
            `要全面分析"${userMessage}"，我们需要关注这些关键点：`,
            `"${userMessage}"这个问题很值得研究，我的分析如下：`
        ]
    };
    
    // 特殊关键词处理
    if (message.includes('你好') || message.includes('嗨') || message.includes('hello')) {
        return `您好！我是小琪智能助手，很高兴为您服务！今天过得怎么样？`;
    }
    
    if (message.includes('名字') || message.includes('谁')) {
        return `我叫小琪，是小琪智能助手，您的纯中文智能伙伴！`;
    }
    
    if (message.includes('谢谢') || message.includes('感谢')) {
        return `不客气！能够帮助您是我的快乐 😊 还有什么其他问题吗？`;
    }
    
    // 根据模式选择回复
    const modeReplies = replies[mode] || replies.dialogue;
    return modeReplies[Math.floor(Math.random() * modeReplies.length)];
}

// 发送消息接口
router.post('/chat', (req, res) => {
    try {
        const { message, userId = 'anonymous', mode = 'dialogue' } = req.body;
        
        if (!message || message.trim() === '') {
            return res.status(400).json({ error: '消息不能为空' });
        }
        
        // 生成回复
        const reply = generateSmartReply(message, mode);
        
        // 保存对话历史
        if (!conversationHistory[userId]) {
            conversationHistory[userId] = [];
        }
        
        conversationHistory[userId].push(
            { role: 'user', content: message, timestamp: new Date().toISOString() },
            { role: 'assistant', content: reply, timestamp: new Date().toISOString() }
        );
        
        // 限制历史记录长度
        if (conversationHistory[userId].length > 50) {
            conversationHistory[userId] = conversationHistory[userId].slice(-50);
        }
        
        res.json({
            success: true,
            reply: reply,
            timestamp: new Date().toISOString(),
            mode: mode
        });
        
    } catch (error) {
        console.error('聊天接口错误:', error);
        res.status(500).json({ error: '处理消息时发生错误' });
    }
});

// 获取对话历史接口
router.get('/history/:userId', (req, res) => {
    const { userId } = req.params;
    const history = conversationHistory[userId] || [];
    
    res.json({
        success: true,
        history: history,
        count: history.length
    });
});

// 清空对话历史接口
router.delete('/history/:userId', (req, res) => {
    const { userId } = req.params;
    
    if (conversationHistory[userId]) {
        delete conversationHistory[userId];
    }
    
    res.json({
        success: true,
        message: '对话历史已清空'
    });
});

// 获取可用功能列表
router.get('/features', (req, res) => {
    res.json({
        success: true,
        features: [
            { id: 'dialogue', name: '智能对话', description: '自然流畅的对话交流' },
            { id: 'creation', name: '创作中心', description: '帮您创作各类内容' },
            { id: 'analysis', name: '深度分析', description: '深入分析问题和数据' },
            { id: 'code', name: '代码助手', description: '编程和技术支持' },
            { id: 'file', name: '文件分析', description: '解析文档内容' }
        ]
    });
});

module.exports = router;