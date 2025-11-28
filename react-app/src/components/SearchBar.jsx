import './SearchBar.css';

function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="🔍 Rechercher par réf, désignation ou notes..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
            {searchTerm && (
                <button
                    className="clear-search"
                    onClick={() => onSearchChange('')}
                    title="Effacer"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default SearchBar;
