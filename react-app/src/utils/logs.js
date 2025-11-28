/**
 * Logs Manager
 * Handles recording and retrieving application logs.
 */

const LOGS_KEY = 'inventory_logs';
const MAX_LOGS = 10000;

export const LogManager = {
    /**
     * Add a new log entry
     * @param {string} action - The action performed (e.g., 'add_item', 'update_price')
     * @param {object} details - Additional details about the action
     * @param {string} user - The user who performed the action (default: 'system')
     */
    addLog: (action, details = {}, user = 'system') => {
        try {
            const logs = LogManager.getLogs();
            const newLog = {
                id: Date.now().toString(36) + Math.random().toString(36).substr(2),
                timestamp: new Date().toISOString(),
                action,
                user,
                details
            };

            logs.unshift(newLog);

            // Enforce limit
            if (logs.length > MAX_LOGS) {
                logs.length = MAX_LOGS;
            }

            localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
            return newLog;
        } catch (error) {
            console.error('Failed to add log:', error);
        }
    },

    /**
     * Retrieve logs with optional filtering
     * @param {object} filter - Filter criteria { action, user, startDate, endDate }
     */
    getLogs: (filter = {}) => {
        try {
            const logsJson = localStorage.getItem(LOGS_KEY);
            let logs = logsJson ? JSON.parse(logsJson) : [];

            if (filter.action) {
                logs = logs.filter(log => log.action === filter.action);
            }
            if (filter.user) {
                logs = logs.filter(log => log.user === filter.user);
            }
            if (filter.startDate) {
                logs = logs.filter(log => new Date(log.timestamp) >= new Date(filter.startDate));
            }
            if (filter.endDate) {
                logs = logs.filter(log => new Date(log.timestamp) <= new Date(filter.endDate));
            }

            return logs;
        } catch (error) {
            console.error('Failed to retrieve logs:', error);
            return [];
        }
    },

    /**
     * Clear all logs
     */
    clearLogs: () => {
        localStorage.removeItem(LOGS_KEY);
    },

    /**
     * Get statistics from logs
     */
    getStatistics: () => {
        const logs = LogManager.getLogs();
        const stats = {
            totalActions: logs.length,
            actionsByType: {},
            activityByDay: {}
        };

        logs.forEach(log => {
            // Count by type
            stats.actionsByType[log.action] = (stats.actionsByType[log.action] || 0) + 1;

            // Count by day
            const day = log.timestamp.split('T')[0];
            stats.activityByDay[day] = (stats.activityByDay[day] || 0) + 1;
        });

        return stats;
    }
};
