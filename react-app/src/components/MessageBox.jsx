import './MessageBox.css';

function MessageBox({ message, show }) {
    return (
        <div className={`message-box ${show ? 'show' : ''}`}>
            {message}
        </div>
    );
}

export default MessageBox;
