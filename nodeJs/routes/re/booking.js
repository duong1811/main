const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const nodemailer = require('nodemailer');

// Mở kết nối SQLite
const dbPromise = open({
  filename: './restaurant.db',
  driver: sqlite3.Database
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const bookings = await db.all('SELECT * FROM booking ORDER BY id DESC LIMIT ? OFFSET ?', [pageSize, offset]);
    const result = await db.get('SELECT COUNT(*) AS total FROM booking');

    const totalRecords = result.total;
    const totalPages = Math.ceil(totalRecords / pageSize);

    res.render('re/booking', {
      title: 'Booking',
      bookings,
      currentPage: page,
      totalPages,
      hasMore: page < totalPages
    });

  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).send('Database query error');
  }
});

// Get a specific booking
router.get('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.get('SELECT * FROM booking WHERE id = ?', [req.params.id]);
    if (!result) return res.status(404).json({ message: 'Booking not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const {
    name,
    email = null,
    telephone = null,
    date = null,
    estimatedTime = null,
    persons = null,
    note = null,
    status = 0
  } = req.body;
  if (!name || !email || !telephone || !date || !estimatedTime || !persons) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const phoneRegex = /^(\+420)?[1-9][0-9]{8}$/;
  if (!phoneRegex.test(telephone.replace(/\s+/g, ''))) {
    return res.status(400).json({ error: 'Invalid telephone number' });
  }

  try {
    const db = await dbPromise;
    
    const createdAt = new Date().toISOString();
    const result = await db.run(
      `INSERT INTO booking (name, email, telephone, date, estimatedTime, persons, note, status, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, telephone, date, estimatedTime, persons, note, status, createdAt]
    );

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'dryo.181198@gmail.com',
        pass: 'kpjy akjq roqh zcae' // 🔒 Consider loading from env
      }
    });

    const dateParts = date ? date.split('T') : ['Unknown', 'Unknown'];
    const mailOptions = {
      from: 'RỄSTAURANCE',
      to: 're.brno@seznam.cz',
      subject: 'New Booking',
      html: `<h4>Hello, you have a new booking from '${name}'<br>
        <br>
        Name: ${name}<br>
        Email: ${email || 'N/A'}<br>
        Telephone: ${telephone || 'N/A'}<br>
        Persons: ${persons || 'N/A'}<br>
        Date: ${dateParts[0]}<br>
        Time: ${dateParts[1]}<br>
        Estimated Time: ${estimatedTime || 'N/A'}<br>
        Note: <br>
        ${note ? note.replace(/\n/g, '<br>') : 'No note'}<br></h4>
        <a href="https://rebrno.cz/booking-re">https://rebrno.cz/booking-re</a>`
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error('Error sending email:', emailErr);
      // You can choose to continue even if email fails
    }
    res.status(201).json({ message: 'Booking created', bookingId: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a booking and send email
router.put('/:id', async (req, res) => {
  const { status, email, content } = req.body;
  const id = req.params.id;

  try {
    const db = await dbPromise;
    await db.run('UPDATE booking SET status = ? WHERE id = ?', [status, id]);

    if (email && content) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.seznam.cz',
        port: 465,
        secure: true,
        auth: {
          user: 're.brno@seznam.cz',
          pass: 'Rebrno2023',
        },
      });

      const mailOptions = {
        from: 're.brno@seznam.cz',
        to: email,
        subject: 'Booking RỄSTAURACE',
        html: content,
      };

      transporter.sendMail(mailOptions, (mailErr, info) => {
        if (mailErr) {
          console.error('Email error:', mailErr);
          return res.status(500).json({ error: 'Booking updated but email failed' });
        }
        res.json({ message: 'Booking status updated and email sent' });
      });
    } else {
      res.json({ message: 'Booking status updated' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    await db.run('DELETE FROM booking WHERE id = ?', [req.params.id]);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;