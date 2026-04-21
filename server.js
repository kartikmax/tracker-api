const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:4200' // your Angular dev server
}));
app.use(express.json());

// Routes
// ✅ Correct — matches your folder structure
app.use('/api/expenses', require('./routes/expenseRoutes'));

// Health check
app.get('/', (req, res) => res.json({ message: 'FinSync API running ✅' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));