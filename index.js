const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express server!' });
});

// SSE endpoint
app.get('/stream', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Send a message every second
  const messages = [
    "Hello! This is message 1",
    "Welcome to SSE testing! This is message 2",
    "Streaming is working! This is message 3",
    "You're receiving real-time updates! This is message 4",
    "This is the final message in the sequence"
  ];

  let messageIndex = 0;

  const sendMessage = () => {
    if (messageIndex < messages.length) {
      const message = messages[messageIndex];
      // Format the message as SSE data
      res.write(`data: ${JSON.stringify({ message, timestamp: new Date().toISOString() })}\n\n`);
      messageIndex++;
    } else {
      // Send a completion message and end the connection
      res.write(`data: ${JSON.stringify({ message: "Stream complete", timestamp: new Date().toISOString() })}\n\n`);
      clearInterval(interval);
      res.end();
    }
  };

  // Send initial message
  sendMessage();

  // Send subsequent messages every second
  const interval = setInterval(sendMessage, 1000);

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 