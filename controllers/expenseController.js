const Expense = require('../models/Expense');

// Create Expense
exports.createExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    const expense = new Expense({
      amount,
      category,
      description,
      date
    });

    const saved = await expense.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Expenses
exports.getExpenses = async (req, res) => {
  try {
    const { category, sort } = req.query;

    let filter = {};

    // 🔍 Filter by category
    if (category) {
      filter.category = category;
    }

    // 🔃 Sorting logic
    let sortOption = {};
    if (sort === 'desc_date') {
      sortOption = { date: -1 };
    } else if (sort === 'asc_date') {
      sortOption = { date: 1 };
    }

    const expenses = await Expense.find(filter).sort(sortOption);

    res.json(expenses);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};