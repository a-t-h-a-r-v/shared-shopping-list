const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow your React app to connect
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory store for shopping lists
// Structure: { listId: [{ id, text, checked, timestamp }] }
const shoppingLists = {};

// Helper to generate a unique ID
const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('joinList', (listId) => {
    socket.join(listId);
    console.log(`User ${socket.id} joined list: ${listId}`);
    if (!shoppingLists[listId]) {
      shoppingLists[listId] = []; // Initialize if it doesn't exist
    }
    // Send the current state of the list to the newly joined client
    socket.emit('listUpdate', shoppingLists[listId]);
  });

  socket.on('createList', () => {
    const newListId = generateUniqueId();
    shoppingLists[newListId] = [];
    socket.emit('listCreated', newListId);
  });

  socket.on('addItem', ({ listId, text }) => {
    if (shoppingLists[listId]) {
      const newItem = {
        id: generateUniqueId(),
        text,
        checked: false,
        timestamp: new Date().toISOString()
      };
      shoppingLists[listId].push(newItem);
      io.to(listId).emit('listUpdate', shoppingLists[listId]);
      console.log(`Item added to list ${listId}:`, newItem);
    }
  });

  socket.on('removeItem', ({ listId, itemId }) => {
    if (shoppingLists[listId]) {
      shoppingLists[listId] = shoppingLists[listId].filter(item => item.id !== itemId);
      io.to(listId).emit('listUpdate', shoppingLists[listId]);
      console.log(`Item removed from list ${listId}: ${itemId}`);
    }
  });

  socket.on('toggleItem', ({ listId, itemId }) => {
    if (shoppingLists[listId]) {
      const itemIndex = shoppingLists[listId].findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        shoppingLists[listId][itemIndex].checked = !shoppingLists[listId][itemIndex].checked;
        shoppingLists[listId][itemIndex].timestamp = new Date().toISOString(); // Update timestamp on check/uncheck
        io.to(listId).emit('listUpdate', shoppingLists[listId]);
        console.log(`Item toggled in list ${listId}: ${itemId}`);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
