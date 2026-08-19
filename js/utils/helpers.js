/**
 * 获取当前时间戳（毫秒）
 * @returns {number}
 */
export function getCurrentTimestamp() {
    return Date.now();
}

/**
 * 格式化数字，保留两位小数
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) return '—';
    return num.toFixed(2);
}
