const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // If using environment variables

const app = express();

// Establish the MongoDB connection
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set up your server's routes and middleware here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
