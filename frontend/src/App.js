import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ShoppingList from './ShoppingList';

const socket = io('http://localhost:5000'); // Connect to your backend

function App() {
  const [currentListId, setCurrentListId] = useState('');
  const [inputListId, setInputListId] = useState('');
  const [messages, setMessages] = useState([]); // For displaying system messages

  useEffect(() => {
    socket.on('listCreated', (newListId) => {
      setCurrentListId(newListId);
      setMessages(prev => [...prev, `New list created! Share this ID: ${newListId}`]);
    });

    socket.on('connect_error', (error) => {
      setMessages(prev => [...prev, `Connection Error: ${error.message}`]);
    });

    return () => {
      socket.off('listCreated');
      socket.off('connect_error');
    };
  }, []);

  const handleCreateList = () => {
    socket.emit('createList');
  };

  const handleJoinList = () => {
    if (inputListId.trim()) {
      setCurrentListId(inputListId.trim());
      setMessages([]); // Clear messages when joining
    } else {
      setMessages(prev => [...prev, "Please enter a List ID to join."]);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Shared Shopping List</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Manage Lists</h2>
        <button onClick={handleCreateList} style={{ marginRight: '10px', padding: '10px 15px', cursor: 'pointer' }}>Create New List</button>
        <input
          type="text"
          placeholder="Enter List ID to join"
          value={inputListId}
          onChange={(e) => setInputListId(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <button onClick={handleJoinList} style={{ padding: '10px 15px', cursor: 'pointer' }}>Join List</button>
      </div>

      {messages.map((msg, index) => (
        <p key={index} style={{ color: 'red' }}>{msg}</p>
      ))}

      {currentListId && (
        <>
          <h2>Current List ID: <span style={{ color: 'blue' }}>{currentListId}</span></h2>
          <ShoppingList socket={socket} listId={currentListId} />
        </>
      )}
    </div>
  );
}

export default App;
