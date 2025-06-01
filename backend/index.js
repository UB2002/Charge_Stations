require('dotenv').config();
const express = require('express');
const connectDB = require('./db/config');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());


app.use('/', require('./routes/hello'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stations', require('./routes/stations'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);