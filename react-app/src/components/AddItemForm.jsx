import { useState } from 'react';
import './AddItemForm.css';

function AddItemForm({ onAdd }) {
    const [formData, setFormData] = useState({
        ref: '',
        designation: '',
        quantity: '',
        price: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.ref && formData.designation && formData.quantity) {
            onAdd(formData);
            setFormData({ ref: '', designation: '', quantity: '', price: '' });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form className="add-item-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Réf</label>
                <input
                    type="text"
                    name="ref"
                    value={formData.ref}
                    onChange={handleChange}
                    placeholder="Réf"
                    required
                    style={{ width: '80px' }}
                />
            </div>
            <div className="form-group">
                <label>Désignation</label>
                <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    style={{ width: '300px' }}
                />
            </div>
            <div className="form-group">
                <label>Qté</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    required
                    style={{ width: '60px' }}
                />
            </div>
            <div className="form-group">
                <label>Prix (DH)</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    style={{ width: '80px' }}
                />
            </div>
            <button type="submit" className="btn btn-success">
                ➕ Ajouter
            </button>
        </form>
    );
}

export default AddItemForm;
