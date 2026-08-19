// 问候语列表
const greetings = [
    '你好！欢迎使用模块化示例。',
    '👋 今天过得怎么样？',
    '🌟 愿你有个美好的一天！',
    '🚀 前端模块化让代码更清晰。',
    '🎉 你已成功加载 ES Module！'
];

/**
 * 获取默认问候语（第一条）
 * @returns {string}
 */
export function getGreeting() {
    return greetings[0];
}

/**
 * 随机获取一条问候语
 * @returns {string}
 */
export function getRandomGreeting() {
    const index = Math.floor(Math.random() * greetings.length);
    return greetings[index];
}
