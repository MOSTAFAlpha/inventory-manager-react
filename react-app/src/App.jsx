import { useState, useEffect } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import AddItemForm from './components/AddItemForm';
import FilterPanel from './components/FilterPanel';
import InventoryTable from './components/InventoryTable';
import GrandTotal from './components/GrandTotal';
import MessageBox from './components/MessageBox';
import SearchBar from './components/SearchBar';
import DarkModeToggle from './components/DarkModeToggle';
import StatsPanel from './components/StatsPanel';
import { originalInventoryData } from './data/originalInventory';
import { LogManager } from './utils/logs';
import { ExportManager } from './utils/export';
import LogViewer from './components/LogViewer';

function App() {
  // Initialize items state with data from localStorage or original inventory
  const getInitialItems = () => {
    const savedData = localStorage.getItem('inventoryData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
    // Load original Solo Electronique inventory data if no localStorage
    return originalInventoryData.map((item, index) => ({
      id: Date.now() + index,
      ref: item.ref,
      designation: item.designation,
      quantity: item.qty,
      price: item.price,
      image: '',
      notes: item.note || ''
    }));
  };

  const [items, setItems] = useState(getInitialItems);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'ref', direction: 'asc' }); // Sort by ref ascending by default

  // Load dark mode preference on mount and log app start
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    LogManager.addLog('app_start', { version: '2.0.0-alpha' });
  }, []);

  // Save data to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('inventoryData', JSON.stringify(items));
    }
  }, [items]);

  // Save and apply dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Helper to display temporary messages
  const displayMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  // Add new item
  const addItem = (newItem) => {
    const item = {
      id: Date.now(),
      ref: newItem.ref,
      designation: newItem.designation,
      quantity: parseFloat(newItem.quantity) || 0,
      price: parseFloat(newItem.price) || 0,
      image: '',
      notes: ''
    };
    setItems([...items, item]);
    LogManager.addLog('add_item', { ref: item.ref, designation: item.designation });
    displayMessage('✅ Article ajouté avec succès!');
  };

  // Delete item
  const deleteItem = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setItems(items.filter(item => item.id !== id));
      LogManager.addLog('delete_item', { id });
      displayMessage('🗑️ Article supprimé');
    }
  };

  // Update item
  const updateItem = (id, field, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
    LogManager.addLog('update_item', { id, field, value });
  };

  // Export functions
  const exportToCSV = () => {
    ExportManager.exportToCSV(items);
    LogManager.addLog('export_data', { format: 'csv' });
    displayMessage('📄 Export CSV réussi!');
  };

  const exportToJSON = () => {
    ExportManager.exportToJSON(items);
    LogManager.addLog('export_data', { format: 'json' });
    displayMessage('💾 Export JSON réussi!');
  };

  // Import data
  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        let importedData;
        if (file.name.endsWith('.json')) {
          importedData = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n').filter(line => line.trim());
          importedData = lines.slice(1).map((line, index) => {
            const values = line.split(',').map(v => v.replace(/^\"|\"$/g, '').trim());
            return {
              id: Date.now() + index,
              ref: values[0] || '',
              designation: values[1] || '',
              quantity: parseFloat(values[2]) || 0,
              price: parseFloat(values[3]) || 0,
              image: '',
              notes: values[5] || ''
            };
          });
        }
        if (importedData && Array.isArray(importedData)) {
          setItems(importedData);
          displayMessage('✅ Import réussi!');
        }
      } catch (error) {
        displayMessage('❌ Erreur lors de l\'import');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Filtering and sorting
  const filteredItems = items.filter(item => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase().trim();
    const ref = (item.ref || '').toString().toLowerCase();
    const designation = (item.designation || '').toString().toLowerCase();
    const notes = (item.notes || '').toString().toLowerCase();

    return (
      ref.includes(search) ||
      designation.includes(search) ||
      notes.includes(search)
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    if (sortConfig.key === 'ref') {
      aVal = parseInt(aVal) || 0;
      bVal = parseInt(bVal) || 0;
    }
    if (sortConfig.key === 'total') {
      aVal = a.quantity * a.price;
      bVal = b.quantity * b.price;
    }
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Calculate grand total
  const grandTotal = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);
  console.log('DEBUG - sortedItems length:', sortedItems.length);

  return (
    <div className="app">
      <div className="container">
        <div className="header-with-toggle">
          <h1>📝 Gestion de Stock & Devis (React)</h1>
          <DarkModeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        </div>
        <Toolbar
          onPrint={() => window.print()}
          onExportCSV={exportToCSV}
          onExportJSON={exportToJSON}
          onImport={importData}
          onShowLogs={() => setShowLogs(true)}
        />
        <StatsPanel items={items} />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <AddItemForm onAdd={addItem} />
        <FilterPanel hiddenColumns={hiddenColumns} setHiddenColumns={setHiddenColumns} />
        <InventoryTable
          items={sortedItems}
          onDelete={deleteItem}
          onUpdate={updateItem}
          hiddenColumns={hiddenColumns}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
        <div className="spacer" />
        <GrandTotal total={grandTotal} />
        <MessageBox message={message} show={showMessage} />
        {showLogs && <LogViewer onClose={() => setShowLogs(false)} />}
      </div>
    </div>
  );
}

export default App;
