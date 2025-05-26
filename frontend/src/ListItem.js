import React from 'react';

function ListItem({ item, onRemove, onToggle }) {
  const formatTimestamp = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString(); // Formats date and time based on user's locale
  };

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #eee',
        backgroundColor: item.checked ? '#f0f0f0' : 'white',
        textDecoration: item.checked ? 'line-through' : 'none',
        color: item.checked ? '#888' : '#333'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onToggle(item.id)}
          style={{ marginRight: '10px', transform: 'scale(1.2)' }}
        />
        <span>{item.text}</span>
      </div>
      <div style={{ fontSize: '0.8em', color: '#666', textAlign: 'right' }}>
        {item.timestamp && (
          <div style={{ marginBottom: '5px' }}>
            <small>Last updated: {formatTimestamp(item.timestamp)}</small>
          </div>
        )}
        <button
          onClick={() => onRemove(item.id)}
          style={{
            background: 'red',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default ListItem;
