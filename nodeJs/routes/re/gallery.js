const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Path to the local gallery folder
const baseGalleryPath = path.join(__dirname, '../../public/gallery');

// Multer config to save files to gallery folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, baseGalleryPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Giữ nguyên tên file
  }
});

const upload = multer({ storage: storage });

// Route to get list of image files in the gallery folder
router.get('/', async (req, res) => {
  try {
    const files = fs.readdirSync(baseGalleryPath);
    const imageFiles = files.filter(f =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(f)
    ).map(f => ({
      name: f,
      url: `/gallery/${f}`
    }));

    res.json(imageFiles);
  } catch (err) {
    console.error('Error reading gallery folder:', err);
    res.status(500).json({ error: 'Cannot read gallery folder' });
  }
});

// Route to upload a new gallery image
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  res.json({
    message: 'Image uploaded successfully',
    fileName: req.file.filename,
    url: `/gallery/${req.file.filename}`
  });
});

module.exports = router;