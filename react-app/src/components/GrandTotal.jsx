import './GrandTotal.css';

function GrandTotal({ total }) {
    return (
        <div className="grand-total-box">
            GRAND TOTAL : <span>{total.toFixed(2)}</span> DH
        </div>
    );
}

export default GrandTotal;
