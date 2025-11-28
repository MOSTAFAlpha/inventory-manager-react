import './DarkModeToggle.css';

function DarkModeToggle({ darkMode, onToggle }) {
    return (
        <button
            className="dark-mode-toggle"
            onClick={onToggle}
            title={darkMode ? 'Mode clair' : 'Mode sombre'}
        >
            {darkMode ? '☀️' : '🌙'}
        </button>
    );
}

export default DarkModeToggle;
