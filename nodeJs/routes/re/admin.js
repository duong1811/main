const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// Mở kết nối SQLite
const dbPromise = open({
  filename: './restaurant.db', // bạn dùng file DB giống booking
  driver: sqlite3.Database
});

// Get all reviews, có phân trang
router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const reviews = await db.all(
      'SELECT * FROM reviews ORDER BY datetime(created_at) DESC LIMIT ? OFFSET ?',
      [pageSize, offset]
    );

    const result = await db.get('SELECT COUNT(*) AS total FROM reviews');
    const totalRecords = result.total;
    const totalPages = Math.ceil(totalRecords / pageSize);

    res.render('re/admin', {
      title: 'Reviews',
      reviews,
      currentPage: page,
      totalPages,
      hasMore: page < totalPages
    });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).send('Database query error');
  }
});

// Get a specific review by ID
router.get('/reviews-api/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const review = await db.get('SELECT * FROM reviews WHERE id = ?', [req.params.id]);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all reviews in JSON format, có phân trang
router.get('/reviews-api', async (req, res) => {
  console.log('GET /api route được gọi');
  try {
    const db = await dbPromise;
    const reviews = await db.all('SELECT * FROM reviews ORDER BY datetime(created_at) DESC');
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ error: 'Database query error' });
  }
});
// Create a new review
router.post('/', async (req, res) => {
  const { name, rating, reviewCZ, reviewEN } = req.body;

  // Validate bắt buộc
  if (!name || !rating) {
    return res.status(400).json({ error: "'name' and 'rating' are required" });
  }

  try {
    const db = await dbPromise;
    const result = await db.run(
      `INSERT INTO reviews (name, rating, reviewCZ, reviewEN, created_at) VALUES (?, ?, ?, ?, datetime('now'))`,
      [name, rating, reviewCZ || null, reviewEN || null]
    );
    res.status(201).json({ message: 'Review created', reviewId: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update review by ID
router.put('/:id', async (req, res) => {
  const { name, rating, reviewCZ, reviewEN } = req.body;
  const id = req.params.id;

  // Validate bắt buộc
  if (!name || !rating) {
    return res.status(400).json({ error: "'name' and 'rating' are required" });
  }

  try {
    const db = await dbPromise;
    const result = await db.run(
      `UPDATE reviews SET name = ?, rating = ?, reviewCZ = ?, reviewEN = ? WHERE id = ?`,
      [name, rating, reviewCZ || null, reviewEN || null, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a review by ID
router.delete('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.run(
      'DELETE FROM reviews WHERE id = ?',
      [req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;