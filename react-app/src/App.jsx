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
  const [sortConfig, setSortConfig] = useState({ key: 'ref', direction: 'asc' }); // Sort by ref ascending by default

  // Load dark mode preference on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
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

  // Calculate grand total
  const grandTotal = items.reduce((sum, item) => {
    const total = (item.quantity || 0) * (item.price || 0);
    return sum + total;
  }, 0);

  // Show message
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
    displayMessage('✅ Article ajouté avec succès!');
  };

  // Delete item
  const deleteItem = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setItems(items.filter(item => item.id !== id));
      displayMessage('🗑️ Article supprimé');
    }
  };

  // Update item
  const updateItem = (id, field, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Réf', 'Désignation', 'Qté', 'Prix (DH)', 'Total (DH)', 'Notes'];
    const rows = items.map(item => [
      item.ref,
      item.designation,
      item.quantity,
      item.price.toFixed(2),
      (item.quantity * item.price).toFixed(2),
      item.notes || ''
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `inventaire_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    displayMessage('📄 Export CSV réussi!');
  };

  // Export to JSON
  const exportToJSON = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `inventaire_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
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
          // Simple CSV parser
          const lines = content.split('\n').filter(line => line.trim());
          const headers = lines[0].split(',');
          importedData = lines.slice(1).map((line, index) => {
            const values = line.split(',').map(v => v.replace(/^"|"$/g, '').trim());
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
    e.target.value = ''; // Reset file input
  };

  // Filter and sort items
  const filteredItems = items.filter(item => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      item.ref.toLowerCase().includes(search) ||
      item.designation.toLowerCase().includes(search) ||
      (item.notes && item.notes.toLowerCase().includes(search))
    );
  });

  console.log('DEBUG - items:', items.length, items);
  console.log('DEBUG - filteredItems:', filteredItems.length, filteredItems);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    // Convert ref to number for proper numeric sorting
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

  console.log('DEBUG - sortedItems:', sortedItems.length, sortedItems);

  // Handle column sort
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

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
        />

        <StatsPanel items={items} />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <AddItemForm onAdd={addItem} />

        <FilterPanel
          hiddenColumns={hiddenColumns}
          setHiddenColumns={setHiddenColumns}
        />

        <InventoryTable
          items={sortedItems}
          onDelete={deleteItem}
          onUpdate={updateItem}
          hiddenColumns={hiddenColumns}
          onSort={handleSort}
          sortConfig={sortConfig}
        />

        <div className="spacer"></div>
      </div>

      <GrandTotal total={grandTotal} />

      <MessageBox message={message} show={showMessage} />
    </div>
  );
}

export default App;
