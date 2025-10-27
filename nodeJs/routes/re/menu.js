const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Path to the local menu folder
const baseMenuPath = path.join(__dirname, '../../public');

// Multer config to save files to local folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, menuFolder);
  },
  filename: function (req, file, cb) {
    // Keep original file name, or you can rename as needed
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to get list of PDF files in the menu folder
router.get('/', async (req, res) => {
  const folder = req.query.folder;

  if (!folder) return res.status(400).json({ error: 'Missing folder name' });

  const targetPath = path.join(baseMenuPath, folder);

  try {
    const files = fs.readdirSync(targetPath);
    const pdfFiles = files.filter(f => f.endsWith('.pdf')).map(f => ({
      name: f,
      url: `/${folder}/${f}`
    }));

    res.json(pdfFiles);
  } catch (err) {
    console.error('Error reading menu folder:', err);
    res.status(500).json({ error: 'Cannot read menu folder' });
  }
});
// Route to upload a new menu file (PDF)
router.post('/update-menu', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  // If you want to delete the old file, you can add that here
  // For example, req.body.oldFileName to delete the old file

  res.json({
    message: 'File uploaded successfully',
    fileName: req.file.filename,
    url: `/menu/${req.file.filename}`
  });
});

// Export the router
module.exports = router;