import './FilterPanel.css';

function FilterPanel({ hiddenColumns, setHiddenColumns }) {
    const columns = [
        { name: 'Réf', index: 0 },
        { name: 'Désignation', index: 1 },
        { name: 'Quantité', index: 2 },
        { name: 'Prix Unitaire', index: 3 },
        { name: 'Prix Total', index: 4 },
        { name: 'Image', index: 5 },
        { name: 'Notes', index: 6 }
    ];

    const handleToggle = (index) => {
        if (hiddenColumns.includes(index)) {
            setHiddenColumns(hiddenColumns.filter(i => i !== index));
        } else {
            setHiddenColumns([...hiddenColumns, index]);
        }
    };

    return (
        <div className="filter-panel">
            <strong style={{ display: 'block', marginBottom: '10px' }}>
                Masquer les colonnes pour l'impression:
            </strong>
            <div className="column-filter-controls">
                {columns.map(col => (
                    <label key={col.index}>
                        <input
                            type="checkbox"
                            checked={!hiddenColumns.includes(col.index)}
                            onChange={() => handleToggle(col.index)}
                        />
                        {col.name}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default FilterPanel;
