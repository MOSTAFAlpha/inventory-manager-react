# 📝 React Inventory Manager

A modern, feature-rich inventory management application built with React and Vite.

## ✨ Features

- **CRUD Operations**: Add, view, edit, and delete inventory items
- **Real-time Calculations**: Automatic total price calculations
- **Data Persistence**: LocalStorage integration for data retention
- **Image Upload**: Add product images with preview
- **Export Functions**: Export data to CSV or JSON formats
- **Print Optimization**: Customizable column visibility for printing
- **Premium UI**: Modern design with gradients, animations, and smooth transitions
- **Toast Notifications**: User feedback for all actions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage

### Adding Items

1. Fill in the form fields:
   - **Réf**: Item reference number
   - **Désignation**: Item description
   - **Qté**: Quantity
   - **Prix (DH)**: Unit price
2. Click "➕ Ajouter" to add the item

### Editing Items

- Click directly on quantity or price cells to edit values
- Changes are saved automatically to localStorage

### Managing Images

- Click on the "📷 Cliquez pour ajouter" placeholder
- Select an image file
- Remove by clicking the "✕" button on the preview

### Adding Notes

- Type directly in the Notes column for any item
- Notes are saved automatically

### Exporting Data

- **CSV**: Click "📄 Export CSV" for spreadsheet-compatible format
- **JSON**: Click "💾 Export JSON" for raw data export

### Printing

1. Click "🖨️ Imprimer"
2. Use the filter panel to hide columns you don't want to print
3. Print using your browser's print dialog

## 🏗️ Architecture

```
src/
├── App.jsx                 # Main application logic
├── App.css                # Global styles
├── components/
│   ├── Toolbar.jsx        # Action buttons
│   ├── AddItemForm.jsx    # Item creation form
│   ├── FilterPanel.jsx    # Column visibility controls
│   ├── InventoryTable.jsx # Main data table
│   ├── GrandTotal.jsx     # Total calculation display
│   └── MessageBox.jsx     # Toast notifications
```

## 🎨 Design Features

- **Modern Color Palette**: Vibrant gradients and professional color scheme
- **Typography**: Inter font family for clean, modern look
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Works on desktop and tablet devices
- **Print-Friendly**: Optimized layout for printing

## 💾 Data Storage

All data is stored locally in your browser's localStorage:
- Survives page refreshes
- Persists across browser sessions
- No backend required

## 🛠️ Built With

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Google Fonts (Inter)](https://fonts.google.com/) - Typography
- Modern CSS3 with gradients and animations

## 📄 License

This project is open source and available for use.

## 🙏 Acknowledgments

Enhanced from the original vanilla HTML/JavaScript inventory manager with React best practices and modern UI design patterns.
