import './InventoryTable.css';

function InventoryTable({ items, onDelete, onUpdate, hiddenColumns, onSort, sortConfig }) {
  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate(id, 'image', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isColumnHidden = (index) => hiddenColumns.includes(index);

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return ' ⇅';
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  console.log('InventoryTable - items:', items.length, 'hiddenColumns:', hiddenColumns);

  return (
    <table className="inventory-table">
      <thead>
        <tr>
          {!isColumnHidden(0) && (
            <th onClick={() => onSort('ref')} className="sortable">
              Réf{getSortIndicator('ref')}
            </th>
          )}
          {!isColumnHidden(1) && (
            <th onClick={() => onSort('designation')} className="sortable" style={{ width: '30%' }}>
              Désignation{getSortIndicator('designation')}
            </th>
          )}
          {!isColumnHidden(2) && (
            <th onClick={() => onSort('quantity')} className="sortable">
              Qté{getSortIndicator('quantity')}
            </th>
          )}
          {!isColumnHidden(3) && (
            <th onClick={() => onSort('price')} className="sortable">
              Prix (DH){getSortIndicator('price')}
            </th>
          )}
          {!isColumnHidden(4) && (
            <th onClick={() => onSort('total')} className="sortable">
              Total (DH){getSortIndicator('total')}
            </th>
          )}
          {!isColumnHidden(5) && <th style={{ width: '10%' }}>Image</th>}
          {!isColumnHidden(6) && <th className="notes-column">Notes</th>}
          <th className="actions-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items && items.length > 0 ? (
          items.map((item) => {
            const total = (item.quantity * item.price).toFixed(2);
            return (
              <tr key={item.id}>
                {!isColumnHidden(0) && <td>{item.ref}</td>}
                {!isColumnHidden(1) && <td>{item.designation}</td>}
                {!isColumnHidden(2) && (
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => onUpdate(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="qty-input"
                    />
                  </td>
                )}
                {!isColumnHidden(3) && (
                  <td>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => onUpdate(item.id, 'price', parseFloat(e.target.value) || 0)}
                      step="0.01"
                      className="price-input"
                    />
                  </td>
                )}
                {!isColumnHidden(4) && (
                  <td data-print-price={`${total} DH`}>
                    <span className="total-display">{total}</span>
                  </td>
                )}
                {!isColumnHidden(5) && (
                  <td>
                    {item.image ? (
                      <div className="image-preview">
                        <img src={item.image} alt="Preview" />
                        <button
                          className="remove-image-btn"
                          onClick={() => onUpdate(item.id, 'image', '')}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="image-upload-container">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(item.id, e)}
                          id={`image-${item.id}`}
                          className="image-input"
                        />
                        <label htmlFor={`image-${item.id}`} className="image-placeholder">
                          📷 Cliquez pour ajouter
                        </label>
                      </div>
                    )}
                  </td>
                )}
                {!isColumnHidden(6) && (
                  <td className="notes-column">
                    <textarea
                      value={item.notes || ''}
                      onChange={(e) => onUpdate(item.id, 'notes', e.target.value)}
                      placeholder="Ajouter des notes..."
                    />
                  </td>
                )}
                <td className="actions-column">
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(item.id)}
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
              Aucun article à afficher
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default InventoryTable;
