// -------- 导入模块 --------
import { getGreeting, getRandomGreeting } from './modules/greeting.js';
import { add, subtract, multiply, divide } from './modules/calculator.js';
import { getCurrentTimestamp, formatNumber } from './utils/helpers.js';

// -------- DOM 引用 --------
const greetingMsg = document.getElementById('greeting-message');
const greetBtn = document.getElementById('greet-btn');

const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operator = document.getElementById('operator');
const calcBtn = document.getElementById('calc-btn');
const calcResult = document.getElementById('calc-result').querySelector('span');

const timestampDisplay = document.getElementById('timestamp-display');
const timestampBtn = document.getElementById('timestamp-btn');

// -------- 1. 问候模块 --------
function renderGreeting(message) {
    greetingMsg.textContent = message;
}

// 初始化显示
renderGreeting(getGreeting());

// 点击换问候语
greetBtn.addEventListener('click', () => {
    renderGreeting(getRandomGreeting());
});

// -------- 2. 计算器模块 --------
function handleCalculate() {
    const a = parseFloat(num1.value);
    const b = parseFloat(num2.value);
    const op = operator.value;
    let result;

    if (isNaN(a) || isNaN(b)) {
        calcResult.textContent = '⚠️ 请输入有效数字';
        return;
    }

    switch (op) {
        case 'add':
            result = add(a, b);
            break;
        case 'subtract':
            result = subtract(a, b);
            break;
        case 'multiply':
            result = multiply(a, b);
            break;
        case 'divide':
            if (b === 0) {
                calcResult.textContent = '⚠️ 除数不能为 0';
                return;
            }
            result = divide(a, b);
            break;
        default:
            result = '?';
    }

    calcResult.textContent = formatNumber(result);
}

calcBtn.addEventListener('click', handleCalculate);
// 初始计算一次
handleCalculate();

// -------- 3. 工具函数模块 --------
function renderTimestamp() {
    timestampDisplay.textContent = getCurrentTimestamp();
}

renderTimestamp();
timestampBtn.addEventListener('click', renderTimestamp);

// 控制台输出模块信息，方便查看
console.log('✅ ES Module 已加载！');
console.log('📦 导入的模块：', {
    getGreeting,
    getRandomGreeting,
    add,
    subtract,
    multiply,
    divide,
    getCurrentTimestamp,
    formatNumber,
});
