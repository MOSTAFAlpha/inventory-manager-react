/**
 * Export Manager
 * Handles data export in various formats.
 */

export const ExportManager = {
    /**
     * Convert data to CSV format
     * @param {Array} data - Array of objects to export
     * @returns {string} CSV string
     */
    convertToCSV: (data) => {
        if (!data || !data.length) return '';

        const headers = Object.keys(data[0]);
        const csvRows = [];

        // Add headers
        csvRows.push(headers.join(','));

        // Add data
        for (const row of data) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    },

    /**
     * Trigger a file download
     * @param {string} content - File content
     * @param {string} fileName - Name of the file
     * @param {string} contentType - MIME type
     */
    downloadFile: (content, fileName, contentType) => {
        const a = document.createElement('a');
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    },

    /**
     * Export inventory to CSV
     * @param {Array} inventory - Inventory items
     */
    exportToCSV: (inventory) => {
        const csv = ExportManager.convertToCSV(inventory);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        ExportManager.downloadFile(csv, `inventory-${timestamp}.csv`, 'text/csv');
    },

    /**
     * Export inventory to JSON
     * @param {Array} inventory - Inventory items
     */
    exportToJSON: (inventory) => {
        const json = JSON.stringify(inventory, null, 2);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        ExportManager.downloadFile(json, `inventory-backup-${timestamp}.json`, 'application/json');
    },

    /**
     * Generate a printable report (opens in new window)
     * @param {Array} inventory - Inventory items
     */
    generateReport: (inventory) => {
        const printWindow = window.open('', '_blank');
        const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const totalItems = inventory.reduce((sum, item) => sum + parseInt(item.qty || 0), 0);

        const html = `
      <html>
        <head>
          <title>Inventory Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .header { margin-bottom: 30px; }
            .summary { margin-bottom: 20px; padding: 10px; background: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Inventory Report</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="summary">
            <h3>Summary</h3>
            <p><strong>Total Items:</strong> ${totalItems}</p>
            <p><strong>Total Value:</strong> ${totalValue.toLocaleString()} DA</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Designation</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${inventory.map(item => `
                <tr>
                  <td>${item.ref}</td>
                  <td>${item.designation}</td>
                  <td>${item.qty}</td>
                  <td>${item.price}</td>
                  <td>${(item.price * item.qty).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>window.print();</script>
        </body>
      </html>
    `;

        printWindow.document.write(html);
        printWindow.document.close();
    }
};
