// Load environment variables from .env file
require('dotenv').config(); // <--- Add this line at the very top

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Use the promise-based API for async/await

const app = express();
const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Now correctly loaded from .env
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// --- MySQL Database Configuration ---
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool; // Connection pool for database

// Helper to generate a unique ID
const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

// Function to initialize database connection and create tables if they don't exist
async function initializeDatabase() {
  try {
    // Create a temporary connection to create the database if it doesn't exist
    const tempConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await tempConnection.end(); // Close temporary connection

    // Now create the connection pool for the specified database
    pool = mysql.createPool(dbConfig);

    // Test connection
    await pool.getConnection();
    console.log('Connected to MySQL database and pool created.');

    // Create tables if they don't exist
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS lists (
          id VARCHAR(255) PRIMARY KEY,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table "lists" ensured.');

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS items (
          id VARCHAR(255) PRIMARY KEY,
          list_id VARCHAR(255) NOT NULL,
          text VARCHAR(255) NOT NULL,
          checked BOOLEAN DEFAULT FALSE,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
      )
    `);
    console.log('Table "items" ensured.');

  } catch (error) {
    console.error('Failed to connect to MySQL or create tables:', error);
    process.exit(1); // Exit if database connection fails
  }
}

// Function to get all items for a given listId from the database
async function getListItems(listId) {
  try {
    const [rows] = await pool.execute(
      'SELECT id, text, checked, timestamp FROM items WHERE list_id = ? ORDER BY timestamp ASC',
      [listId]
    );
    // Convert tinyint(1) to boolean for 'checked' field
    return rows.map(row => ({
      ...row,
      checked: row.checked === 1 // MySQL BOOLEAN is stored as TINYINT(1)
    }));
  } catch (error) {
    console.error(`Error fetching items for list ${listId}:`, error);
    return [];
  }
}

// --- Socket.IO Event Handlers ---
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('joinList', async (listId) => {
    socket.join(listId);
    console.log(`User ${socket.id} joined list: ${listId}`);
    try {
      // Check if list exists in DB, if not, create it (handles direct joins to non-existent lists)
      const [listRows] = await pool.execute('SELECT id FROM lists WHERE id = ?', [listId]);
      if (listRows.length === 0) {
        await pool.execute('INSERT INTO lists (id) VALUES (?)', [listId]);
        console.log(`List ${listId} created during join.`);
      }
      const items = await getListItems(listId);
      socket.emit('listUpdate', items);
    } catch (error) {
      console.error(`Error joining list ${listId}:`, error);
      socket.emit('error', 'Failed to join list.');
    }
  });

  socket.on('createList', async () => {
    const newListId = generateUniqueId();
    try {
      await pool.execute('INSERT INTO lists (id) VALUES (?)', [newListId]);
      console.log(`New list created in DB: ${newListId}`);
      socket.emit('listCreated', newListId);
    } catch (error) {
      console.error('Error creating new list:', error);
      socket.emit('error', 'Failed to create new list.');
    }
  });

  socket.on('addItem', async ({ listId, text }) => {
    try {
      const newItem = {
        id: generateUniqueId(),
        list_id: listId,
        text,
        checked: false,
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ') // Format for MySQL DATETIME
      };
      await pool.execute(
        'INSERT INTO items (id, list_id, text, checked, timestamp) VALUES (?, ?, ?, ?, ?)',
        [newItem.id, newItem.list_id, newItem.text, newItem.checked, newItem.timestamp]
      );
      const updatedList = await getListItems(listId);
      io.to(listId).emit('listUpdate', updatedList);
      console.log(`Item added to list ${listId}:`, newItem.text);
    } catch (error) {
      console.error(`Error adding item to list ${listId}:`, error);
      socket.emit('error', 'Failed to add item.');
    }
  });

  socket.on('removeItem', async ({ listId, itemId }) => {
    try {
      await pool.execute('DELETE FROM items WHERE id = ? AND list_id = ?', [itemId, listId]);
      const updatedList = await getListItems(listId);
      io.to(listId).emit('listUpdate', updatedList);
      console.log(`Item removed from list ${listId}: ${itemId}`);
    } catch (error) {
      console.error(`Error removing item from list ${listId}:`, error);
      socket.emit('error', 'Failed to remove item.');
    }
  });

  socket.on('toggleItem', async ({ listId, itemId }) => {
    try {
      // Fetch current status to toggle it
      const [rows] = await pool.execute('SELECT checked FROM items WHERE id = ? AND list_id = ?', [itemId, listId]);
      if (rows.length > 0) {
        const currentCheckedStatus = rows[0].checked === 1; // Convert TINYINT to boolean
        const newCheckedStatus = !currentCheckedStatus;
        const newTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

        await pool.execute(
          'UPDATE items SET checked = ?, timestamp = ? WHERE id = ? AND list_id = ?',
          [newCheckedStatus, newTimestamp, itemId, listId]
        );
        const updatedList = await getListItems(listId);
        io.to(listId).emit('listUpdate', updatedList);
        console.log(`Item toggled in list ${listId}: ${itemId} to ${newCheckedStatus}`);
      }
    } catch (error) {
      console.error(`Error toggling item in list ${listId}:`, error);
      socket.emit('error', 'Failed to toggle item.');
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Start the database initialization and then the server
initializeDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
