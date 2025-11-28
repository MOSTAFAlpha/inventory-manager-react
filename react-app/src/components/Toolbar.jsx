import React from 'react';
import './Toolbar.css';

function Toolbar({ onPrint, onExportCSV, onExportJSON, onImport, onShowLogs }) {
    return (
        <div className="toolbar">
            <div>
                <button className="btn btn-warning" onClick={onPrint}>
                    🖨️ Imprimer
                </button>
                <button className="btn btn-primary" onClick={onExportCSV}>
                    📄 Export CSV
                </button>
                <button className="btn btn-primary" onClick={onExportJSON}>
                    💾 Export JSON
                </button>
                <button className="btn btn-info" onClick={onShowLogs} style={{ marginLeft: '5px' }}>
                    📋 Logs
                </button>
                <label htmlFor="import-file" className="btn btn-success import-btn">
                    📥 Importer
                </label>
                <input
                    id="import-file"
                    type="file"
                    accept=".csv,.json"
                    onChange={onImport}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
}

export default Toolbar;
