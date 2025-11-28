/**
 * Main Application Logic for Inventory Manager (Local Version)
 */

import { InventoryLogManager } from './logs.js';
import { ExportManager } from './export.js';

// Initialize Managers
const logManager = new InventoryLogManager();
const exportManager = ExportManager;

// Default Data (from original HTML)
const DEFAULT_DATA = [
    { ref: "1", des: "ADAPTEURS UG-21 REFERENCE N° R 161018", qty: 19, price: 0, note: "" },
    { ref: "2", des: "ADAPTEURS UG-88 REFERENCE R 141007", qty: 19, price: 0, note: "" },
    { ref: "3", des: "AEROSOL A AIR COMPRIME 400ML", qty: 56, price: 0, note: "" },
    { ref: "5", des: "AMPOULE DE BALISAGE FILETAGE E14 230V", qty: 22, price: 0, note: "" },
    { ref: "8", des: "BOITE DE RACCORDEMNT 30 PAIRES (TPR 30/3M)", qty: 23, price: 0, note: "" },
    { ref: "11", des: "BOUCHONS ANTIDEFLAGRANTS (12V ET 06V)", qty: 153, price: 0, note: "" },
    { ref: "12", des: "BOUCHONS ANTIDEFLAGRANTS 2V 990AH C 1 20 OPZA", qty: 204, price: 0, note: "" },
    { ref: "13", des: "BOUGIE SPARK PLUG MODELE 'C6HSA'", qty: 13, price: 0, note: "" },
    { ref: "14", des: "CABLE COAXIAL 500 TYPE RG 213", qty: 79, price: 0, note: "" },
    { ref: "15", des: "CABLE COAXIAL RIGIDE RG-58", qty: 79, price: 0, note: "" },
    { ref: "22", des: "CABLE EN ACIER GALVANISE 10", qty: 77, price: 0, note: "" },
    { ref: "23", des: "CABLE LY 30 PAIRES (STY 1 OU 2780306) (0,6mm)", qty: 77, price: 0, note: "" },
    { ref: "24", des: "CABLE LY 56 PAIRES (STY 1 OU 2780566) (0,6mm)", qty: 77, price: 0, note: "" },
    { ref: "31", des: "CISAILLE MULTI-USAGES HEAVY DUTY LAME DROITE", qty: 6, price: 0, note: "" },
    { ref: "34", des: "COLLIER DE SERRAGE PLASTIQUE NOIR G.F (PQ 100) 280MM", qty: 26, price: 0, note: "" },
    { ref: "35", des: "COMBINE DE TEST BCA LK.O 120", qty: 7, price: 0, note: "" },
    { ref: "37", des: "CORDE EN NYLON 24 MM DE 55 M", qty: 14, price: 0, note: "" },
    { ref: "38", des: "COSSE CŒUR ACIER GALVANISE GRAND MODEL", qty: 26, price: 0, note: "" },
    { ref: "39", des: "COSSES 670 08 OO 9 06MM", qty: 18, price: 0, note: "" },
    { ref: "40", des: "CUTTEURS LAME RETRACTABLE GRAND MODEL", qty: 12, price: 0, note: "" },
    { ref: "41", des: "DECAMETRE BOITIER ABS RUBAN SOUPLE FIBRE", qty: 6, price: 0, note: "" },
    { ref: "43", des: "EAU DEMINERALISEE EN BIDON DE 5 L", qty: 112, price: 0, note: "" },
    { ref: "45", des: "FER PLAT 60 X 5 DE 6M", qty: 4, price: 0, note: "" },
    { ref: "46", des: "FILTRES BAIE OUTDOUR FH (F5) 1200X440X25MM", qty: 45, price: 0, note: "" },
    { ref: "47", des: "FLACONS HUILE DE VASELINE 200ML", qty: 22, price: 0, note: "" },
    { ref: "52", des: "GRAISSE SILICONE 500 TUBE 100G", qty: 32, price: 0, note: "" },
    { ref: "53", des: "LAMPE A FILETAGE 220 V (ECONOMIQUE)", qty: 75, price: 0, note: "" },
    { ref: "54", des: "LIQUIDE NETTOYAGE CAMERAS < 200°F (93°C)", qty: 60, price: 0, note: "" },
    { ref: "56", des: "MADRIER 3.25 M/20 CM/6 MM", qty: 16, price: 0, note: "" },
    { ref: "58", des: "MOUSSE NETTOYAGE MULTI SURFACE ANTISTATIQUE 400ML", qty: 57, price: 0, note: "" },
    { ref: "60", des: "PAQUET MECHES PERCEUSES (BETON) 06-8-10-12", qty: 10, price: 0, note: "" },
    { ref: "64", des: "PIQUET MASSE ACIER GALVA LONG. 1200 D 4 MM", qty: 10, price: 0, note: "" },
    { ref: "66", des: "POULIE DE LEVAGE DIA 180MM", qty: 4, price: 0, note: "" },
    { ref: "67", des: "PRISE ELECTRIQUE FEMELLE 220 V", qty: 20, price: 0, note: "" },
    { ref: "69", des: "ROULEAU SOUDURE 60/40 ETAIN PLOMB 0.7mm 500G", qty: 13, price: 0, note: "" },
    { ref: "71", des: "SCOTCH GOUDRONNE EP. 3mm X LONG.1500mm", qty: 41, price: 0, note: "" },
    { ref: "72", des: "SCOTCH GOUDRONNE AUTO-SOUDABLE 19mm x 9.15m", qty: 41, price: 0, note: "" },
    { ref: "73", des: "TOILE GRISE POUR ETANCHETTE 50MM X 50M", qty: 12, price: 0, note: "" },
    { ref: "78", des: "TOLE FORTE 20/ 10 DE 2 M/1M", qty: 5, price: 0, note: "" },
    { ref: "79", des: "TRESSE DE MASSE 4,0 mm", qty: 13, price: 0, note: "" },
    { ref: "80", des: "TRESSES A DESSOUDER RoHS 2,0mm long. 1,5m", qty: 21, price: 0, note: "" },
    { ref: "81", des: "TUBE NOIR EN ACIER DE 2 POUCES DE 1,5 M", qty: 5, price: 0, note: "" },
    { ref: "83", des: "CHIFFONS DOUX POUR VITRES N°6", qty: 53, price: 0, note: "" },
    { ref: "87", des: "44,JE9T-9 CLES A FOURCHES DE 3,2 A 19 MM", qty: 3, price: 0, note: "" },
    { ref: "93", des: "AFU,21 POSE-VIS POUR A FENTE", qty: 3, price: 0, note: "" },
    { ref: "104", des: "834,RI 1 MIROIR ORIENTABLE", qty: 3, price: 0, note: "" },
    { ref: "105", des: "835A-1 TIRE-RESSORT", qty: 3, price: 0, note: "" },
    { ref: "106", des: "836-1 LAMPE-STYLO", qty: 7, price: 0, note: "" },
    { ref: "107", des: "SELECTION MECANIQUE GENERALE 84 OUTILS", qty: 4, price: 0, note: "" },
    { ref: "108", des: "440,JE14-14 CLES MIXTES DE 7 A 24MM", qty: 3, price: 0, note: "" },
    { ref: "111", des: "SL,DBOXI-21 DOUILLES 1/2 (COFFRET)", qty: 3, price: 0, note: "" },
    { ref: "120", des: "1 81A.25CPE - PINCE MULTIPRISE A VETRROUILLAGE", qty: 2, price: 0, note: "" },
    { ref: "129", des: "AP6X80-1 POINTE CARREE", qty: 3, price: 0, note: "" },
    { ref: "132", des: "247,G-2 CHASSE-CLOUS DE 2-4 MM", qty: 3, price: 0, note: "" },
    { ref: "133", des: "249,G-2 CHASSE-GOUPILLES GANES DE 2-4 MM", qty: 3, price: 0, note: "" },
    { ref: "139", des: "BIDON EN PLASTIQUE 120 LITRES", qty: 8, price: 0, note: "" }
];

class App {
    constructor() {
        this.inventory = this.loadInventory();
        this.init();
    }

    init() {
        this.renderTable();
        this.updateGrandTotal();
        this.setupEventListeners();
        console.log('App Initialized');
    }

    // --- DATA MANAGEMENT ---

    loadInventory() {
        const saved = localStorage.getItem('inventory_data');
        if (saved) {
            return JSON.parse(saved);
        }
        return DEFAULT_DATA;
    }

    saveInventory() {
        localStorage.setItem('inventory_data', JSON.stringify(this.inventory));
    }

    addItem(item) {
        this.inventory.push(item);
        this.saveInventory();
        this.renderTable();
        this.updateGrandTotal();
        logManager.addLog('add_item', { ref: item.ref, des: item.des });
        this.showMessage('Article ajouté avec succès !');
    }

    deleteItem(ref) {
        if (confirm(`Voulez-vous vraiment supprimer l'article ${ref} ?`)) {
            this.inventory = this.inventory.filter(item => item.ref !== ref);
            this.saveInventory();
            this.renderTable();
            this.updateGrandTotal();
            logManager.addLog('delete_item', { ref });
            this.showMessage('Article supprimé.', true);
        }
    }

    updateItem(ref, field, value) {
        const item = this.inventory.find(i => i.ref === ref);
        if (item) {
            item[field] = value;
            this.saveInventory();
            if (field === 'price' || field === 'qty') {
                this.updateRowTotal(ref);
                this.updateGrandTotal();
            }
            // Log only significant changes to avoid spam
            // logManager.addLog('update_item', { ref, field, value }); 
        }
    }

    // --- UI RENDERING ---

    renderTable() {
        const tbody = document.getElementById('dataBody');
        tbody.innerHTML = '';

        this.inventory.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.ref}</td>
                <td>${item.des}</td>
                <td>${item.qty}</td>
                <td>
                    <input type="number" 
                           value="${item.price || 0}" 
                           min="0" 
                           step="0.01" 
                           data-ref="${item.ref}"
                           onchange="window.app.handlePriceChange(this)">
                </td>
                <td id="total-${item.ref}">${(item.qty * (item.price || 0)).toFixed(2)}</td>
                <td>
                    <div class="image-upload-container" id="preview-${item.ref}">
                        <!-- Image preview logic here if needed -->
                        <div class="image-placeholder">Glisser image</div>
                    </div>
                </td>
                <td class="notes-column">
                    <textarea data-ref="${item.ref}-notes" 
                              onchange="window.app.handleNoteChange(this)">${item.note || ''}</textarea>
                </td>
                <td class="actions-column">
                    <button class="delete-btn" onclick="window.app.deleteItem('${item.ref}')">🗑️</button>
                </td>
            `;
            tbody.appendChild(tr);

            // Attach Drag & Drop Listeners
            const dropZone = tr.querySelector(`#preview-${item.ref}`);
            if (dropZone) {
                dropZone.addEventListener('dragover', (e) => this.handleDragOver(e));
                dropZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
                dropZone.addEventListener('drop', (e) => this.handleDrop(e, item.ref));

                // Load saved image if exists
                if (item.image) {
                    this.renderImagePreview(dropZone, item.image, item.ref);
                }
            }

            // Set print attribute for price
            const priceInput = tr.querySelector(`input[data-ref="${item.ref}"]`);
            if (priceInput) {
                const priceCell = priceInput.closest('td');
                priceCell.setAttribute('data-print-price', parseFloat(item.price || 0).toFixed(2) + ' DH');
            }
        });

        // Re-generate filter controls since table changed
        if (window.generateFilterControls) window.generateFilterControls();
    }

    updateRowTotal(ref) {
        const item = this.inventory.find(i => i.ref === ref);
        if (item) {
            const totalEl = document.getElementById(`total-${ref}`);
            if (totalEl) {
                totalEl.innerText = (item.qty * (item.price || 0)).toFixed(2);
            }
        }
    }

    updateGrandTotal() {
        const total = this.inventory.reduce((sum, item) => sum + (item.qty * (item.price || 0)), 0);
        document.getElementById('grandTotal').innerText = total.toFixed(2);
    }

    showMessage(msg, isError = false) {
        const msgBox = document.getElementById('message-box');
        if (msgBox) {
            msgBox.textContent = msg;
            msgBox.style.backgroundColor = isError ? '#d9534f' : '#4CAF50';
            msgBox.classList.add('show');
            setTimeout(() => msgBox.classList.remove('show'), 3000);
        }
    }

    // --- EVENT HANDLERS ---

    handlePriceChange(input) {
        const ref = input.getAttribute('data-ref');
        const price = parseFloat(input.value) || 0;
        this.updateItem(ref, 'price', price);

        // Update print attribute
        const priceCell = input.closest('td');
        if (priceCell) {
            priceCell.setAttribute('data-print-price', price.toFixed(2) + ' DH');
        }
    }

    handleNoteChange(textarea) {
        const ref = textarea.getAttribute('data-ref').replace('-notes', '');
        this.updateItem(ref, 'note', textarea.value);
    }

    setupEventListeners() {
        // Export Buttons
        document.getElementById('btn-export-csv')?.addEventListener('click', () => {
            exportManager.exportToCSV(this.inventory);
        });
        document.getElementById('btn-export-json')?.addEventListener('click', () => {
            exportManager.exportToJSON(this.inventory);
        });

        // Add Item Form
        document.getElementById('add-item-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const ref = document.getElementById('new-ref').value;
            const des = document.getElementById('new-des').value;
            const qty = parseInt(document.getElementById('new-qty').value) || 0;
            const price = parseFloat(document.getElementById('new-price').value) || 0;

            if (ref && des) {
                this.addItem({ ref, des, qty, price, note: '' });
                e.target.reset();
                // Close modal if we implement one
                document.getElementById('add-item-modal').style.display = 'none';
            }
        });
    }

    // --- IMAGE HANDLING ---

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
    }

    handleDrop(e, ref) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processImage(files[0], ref);
        }
    }

    processImage(file, ref) {
        if (!file.type.startsWith('image/')) {
            this.showMessage('Veuillez déposer une image valide.', true);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            this.updateItem(ref, 'image', base64Image);

            const dropZone = document.getElementById(`preview-${ref}`);
            if (dropZone) {
                this.renderImagePreview(dropZone, base64Image, ref);
            }
        };
        reader.readAsDataURL(file);
    }

    renderImagePreview(container, imageSrc, ref) {
        container.innerHTML = `
            <div style="position: relative; display: inline-block;">
                <img src="${imageSrc}" style="width: 80px; height: 80px; object-fit: contain; border: 1px solid #ccc; border-radius: 4px;">
                <button onclick="window.app.deleteImage('${ref}')" 
                        style="position: absolute; top: -5px; right: -5px; background: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; line-height: 1;">
                    &times;
                </button>
            </div>
        `;
    }

    deleteImage(ref) {
        if (confirm('Supprimer cette image ?')) {
            this.updateItem(ref, 'image', null);
            const dropZone = document.getElementById(`preview-${ref}`);
            if (dropZone) {
                dropZone.innerHTML = '<div class="image-placeholder">Glisser image</div>';
            }
        }
    }
}

// Make app accessible globally
window.app = new App();
