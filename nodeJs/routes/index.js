var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const app = express()

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now());
  },
});

const upload = multer({ storage });
const uploadmenuCZ = multer({
  storage: multer.diskStorage({
    destination: './menuCZ',
    filename: (req, file, cb) => {
      const filename = `${file.originalname}-${Date.now()}.pdf`;
      cb(null, filename);
    },
  }),
});
const uploadmenuEN = multer({
  storage: multer.diskStorage({
    destination: './menuEN',
    filename: (req, file, cb) => {
      const filename = `${file.originalname}-${Date.now()}.pdf`;
      cb(null, filename);
    },
  }),
});
//launch
const uploadlaunchmenuCZ = multer({
  storage: multer.diskStorage({
    destination: './launchmenuCZ',
    filename: (req, file, cb) => {
      const filename = `${file.originalname}-${Date.now()}.pdf`;
      cb(null, filename);
    },
  }),
});
const uploadlaunchmenuEN = multer({
  storage: multer.diskStorage({
    destination: './launchmenuEN',
    filename: (req, file, cb) => {
      const filename = `${file.originalname}-${Date.now()}.pdf`;
      cb(null, filename);
    },
  }),
});
/* GET home page. */
router.get('/index', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/user', function (req, res, next) {
  res.render('user', { title: 'Express' });
});

// menu
router.post('/menuCZ', uploadmenuCZ.single('file'), function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: 'choose file.' });
  }
  res.status(200).json({ message: 'update successfully.' });
}); 
router.post('/menuEN', uploadmenuEN.single('file'), function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: 'choose file' });
  }
  res.status(200).json({ message: 'update successfully.' });
}); 

router.get('/linkmenuCZ', function (req, res) {
   const directoryPath = path.join(__dirname, '..', 'menuCZ');  

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('error read folder:', err);
      res.status(500).json({ error: 'error read folder' });
      return;
    }

    const filteredFiles = files.filter((file) => {
      return fs.statSync(path.join(directoryPath, file)).isFile();
    });

    filteredFiles.sort((a, b) => {
      return fs.statSync(path.join(directoryPath, b)).mtime.getTime() -
             fs.statSync(path.join(directoryPath, a)).mtime.getTime();
    });

    const newestFile = filteredFiles[0];
    const newestFilePath = path.join(directoryPath, newestFile);

    res.json({ newestFilePath: newestFilePath });
  });
});
router.get('/linkmenuEN', function (req, res) {
   const directoryPath = path.join(__dirname, '..', 'menuEN');  

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('error read folder:', err);
      res.status(500).json({ error: 'error read folder' });
      return;
    }

    const filteredFiles = files.filter((file) => {
      return fs.statSync(path.join(directoryPath, file)).isFile();
    });

    filteredFiles.sort((a, b) => {
      return fs.statSync(path.join(directoryPath, b)).mtime.getTime() -
             fs.statSync(path.join(directoryPath, a)).mtime.getTime();
    });

    const newestFile = filteredFiles[0];
    const newestFilePath = path.join(directoryPath, newestFile);

    res.json({ newestFilePath: newestFilePath });
  });
});
//Launch
router.post('/launchmenuCZ', uploadlaunchmenuCZ.single('file'), function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: 'choose file.' });
  }
  res.status(200).json({ message: 'update successfully.' });
});
router.post('/launchmenuEN', uploadlaunchmenuEN.single('file'), function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: 'choose file' });
  }
  res.status(200).json({ message: 'update successfully.' });
});

router.get('/linklaunchMenuCZ', function (req, res) {
  const directoryPath = path.join(__dirname, '..', 'launchmenuCZ');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('error read folder:', err);
      res.status(500).json({ error: 'error read folder' });
      return;
    }

    const filteredFiles = files.filter((file) => {
      return fs.statSync(path.join(directoryPath, file)).isFile();
    });

    filteredFiles.sort((a, b) => {
      return fs.statSync(path.join(directoryPath, b)).mtime.getTime() -
          fs.statSync(path.join(directoryPath, a)).mtime.getTime();
    });

    const newestFile = filteredFiles[0];
    const newestFilePath = path.join(directoryPath, newestFile);

    res.json({ newestFilePath: newestFilePath });
  });
});
router.get('/linklaunchMenuEN', function (req, res) {
  const directoryPath = path.join(__dirname, '..', 'launchmenuEN');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('error read folder:', err);
      res.status(500).json({ error: 'error read folder' });
      return;
    }

    const filteredFiles = files.filter((file) => {
      return fs.statSync(path.join(directoryPath, file)).isFile();
    });

    filteredFiles.sort((a, b) => {
      return fs.statSync(path.join(directoryPath, b)).mtime.getTime() -
          fs.statSync(path.join(directoryPath, a)).mtime.getTime();
    });

    const newestFile = filteredFiles[0];
    const newestFilePath = path.join(directoryPath, newestFile);

    res.json({ newestFilePath: newestFilePath });
  });
});
module.exports = router;

router.post('/booking', upload.single('attachment'), function (req, res, next) {
  const nodemailer = require('nodemailer');
  const fs = require('fs');
  const { name, telephone, email, persons, date, estimatedTime, note } = req.body;
  const dateTimeParts = date.split('T');
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'dryo.181198@gmail.com',
      pass: 'kpjy akjq roqh zcae'
    }
  });

  const mailOptions = {
    from: 'RỄSTAURANCE',
    to: 're.brno@seznam.cz',
    subject: 'BOOKING',
    html: `<h4><h4>Hello, you have a new booking from '${name}'<br>
      <br>
      Name: ${name}<br>
      Email: ${email}<br>
      Telephone: ${telephone}<br>
      Persons: ${persons}<br>
      Date: ${dateTimeParts[0]}<br>
      Time: ${dateTimeParts[1]}<br>
      Estimated Time : ${estimatedTime}<br>
      Note: <br>
      ${note.replace(/\n/g, '<br>')}<br></h4>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error: ' + error);
      res.send('Error sending email.' + error.message);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully!');
    }
  });
});
router.post('/feedback', upload.single('attachment'), function (req, res, next) {
  const nodemailer = require('nodemailer');
  const fs = require('fs');
  const { rating, name, feedback } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'dryo.181198@gmail.com',
      pass: 'kpjy akjq roqh zcae'
    }
  });

  const mailOptions = {
    from: 'RỄSTAURANCE',
    to: 're.brno@seznam.cz',
    subject: 'FEEDBACK',
    html: `<h4>Hello, you have a new feedback from '${name}'<br>
      <br>
      Rating: <span>${rating}</span><br>
      Name: ${name}<br>
      Feedback: <br>
      ${feedback.replace(/\n/g, '<br>')}<br></h4>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error: ' + error);
      res.send('Error sending email.' + error.message);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully!');
    }
  });
});

module.exports = router;
