import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';

function ShoppingList({ socket, listId }) {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    if (listId) {
      socket.emit('joinList', listId);

      socket.on('listUpdate', (updatedList) => {
        setItems(updatedList);
      });
    }

    return () => {
      socket.off('listUpdate');
      // No explicit 'leaveList' event needed for this setup,
      // as joining a new list implicitly changes the context.
      // If full list management was needed, a 'leaveList' might be useful.
    };
  }, [socket, listId]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemText.trim() && listId) {
      socket.emit('addItem', { listId, text: newItemText.trim() });
      setNewItemText('');
    }
  };

  const handleRemoveItem = (itemId) => {
    if (listId) {
      socket.emit('removeItem', { listId, itemId });
    }
  };

  const handleToggleItem = (itemId) => {
    if (listId) {
      socket.emit('toggleItem', { listId, itemId });
    }
  };

  return (
    <div>
      <form onSubmit={handleAddItem} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add a new item"
          style={{ padding: '8px', marginRight: '10px', width: 'calc(100% - 100px)' }}
        />
        <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>Add Item</button>
      </form>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {items.length === 0 ? (
          <p>No items in this list yet. Add some!</p>
        ) : (
          items.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onToggle={handleToggleItem}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
