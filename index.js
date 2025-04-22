const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express server!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 