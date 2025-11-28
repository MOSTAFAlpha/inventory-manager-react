import './StatsPanel.css';

function StatsPanel({ items }) {
    const totalItems = items.length;
    const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const avgPrice = totalItems > 0 ? totalValue / totalQuantity : 0;

    const stats = [
        { label: 'Articles', value: totalItems, icon: '📦', color: '#667eea' },
        { label: 'Quantité totale', value: totalQuantity, icon: '📊', color: '#11998e' },
        { label: 'Valeur totale', value: `${totalValue.toFixed(2)} DH`, icon: '💰', color: '#f093fb' },
        { label: 'Prix moyen', value: `${avgPrice.toFixed(2)} DH`, icon: '📈', color: '#fa709a' }
    ];

    return (
        <div className="stats-panel">
            {stats.map((stat, index) => (
                <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-content">
                        <div className="stat-label">{stat.label}</div>
                        <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatsPanel;
