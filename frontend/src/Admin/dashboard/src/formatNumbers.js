/**
 * Format numbers for readable display
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (num) => {
    if (num === null || num === undefined) return '0';

    // Format numbers greater than 1 million
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    }

    // Format numbers greater than 1000
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }

    // Return number with commas
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};