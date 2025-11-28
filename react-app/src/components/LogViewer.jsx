import React, { useState, useEffect } from 'react';
import { LogManager } from '../utils/logs';
import { X, RefreshCw, Download, Filter } from 'lucide-react';
import './LogViewer.css';

const LogViewer = ({ onClose }) => {
    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState({ action: '', user: '' });
    const [stats, setStats] = useState(null);

    useEffect(() => {
        loadLogs();
    }, [filter]);

    const loadLogs = () => {
        const data = LogManager.getLogs(filter);
        setLogs(data);
        setStats(LogManager.getStatistics());
    };

    const handleExport = () => {
        const csvContent = logs.map(log =>
            `${log.timestamp},${log.action},${log.user},${JSON.stringify(log.details).replace(/,/g, ';')}`
        ).join('\n');

        const blob = new Blob(['Timestamp,Action,User,Details\n' + csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `logs-${new Date().toISOString()}.csv`;
        a.click();
    };

    return (
        <div className="log-viewer-overlay">
            <div className="log-viewer-container">
                <div className="log-viewer-header">
                    <h2>System Logs</h2>
                    <div className="log-viewer-actions">
                        <button onClick={loadLogs} title="Refresh">
                            <RefreshCw size={20} />
                        </button>
                        <button onClick={handleExport} title="Export CSV">
                            <Download size={20} />
                        </button>
                        <button onClick={onClose} title="Close">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="log-stats">
                    <div className="stat-item">
                        <span className="stat-label">Total Actions</span>
                        <span className="stat-value">{stats?.totalActions || 0}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Today</span>
                        <span className="stat-value">
                            {stats?.activityByDay[new Date().toISOString().split('T')[0]] || 0}
                        </span>
                    </div>
                </div>

                <div className="log-filters">
                    <div className="filter-group">
                        <Filter size={16} />
                        <select
                            value={filter.action}
                            onChange={(e) => setFilter({ ...filter, action: e.target.value })}
                        >
                            <option value="">All Actions</option>
                            <option value="add_item">Add Item</option>
                            <option value="update_item">Update Item</option>
                            <option value="delete_item">Delete Item</option>
                            <option value="export_data">Export Data</option>
                        </select>
                    </div>
                </div>

                <div className="log-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Action</th>
                                <th>User</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id}>
                                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                                    <td>
                                        <span className={`badge badge-${log.action.split('_')[0]}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td>{log.user}</td>
                                    <td className="details-cell">
                                        {JSON.stringify(log.details)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LogViewer;
