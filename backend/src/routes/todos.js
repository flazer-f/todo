import express from 'express';
import Todo from '../models/Todo.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create todo
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const todo = await Todo.create({
      user: req.userId,
      title,
      description,
      status: status || 'Incomplete',
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get todos with filter, sort, search
router.get('/', authMiddleware, async (req, res) => {
  const { status, sort, search } = req.query;
  let filter = { user: req.userId };
  if (status) filter.status = status;
  if (search) filter.title = { $regex: search, $options: 'i' };
  let sortObj = {};
  if (sort === 'name_asc' || sort === 'name') sortObj.title = 1;
  if (sort === 'name_desc') sortObj.title = -1;
  if (sort === 'status_asc' || sort === 'status') sortObj.status = 1;
  if (sort === 'status_desc') sortObj.status = -1;
  try {
    const todos = await Todo.find(filter).sort(sortObj);
    res.json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update todo
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, description, status },
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete todo
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
