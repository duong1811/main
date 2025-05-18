var express = require('express');
var router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
const { admin, database } = require('./firestore');
const multer = require('multer');
const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))


const upload_img = multer({
    storage: multer.memoryStorage()
})
const reviewRef = database.collection('review');
router.get('/review', async function (req, res, next) {
    try {
        const snapshot = await reviewRef.get();
        const reviews = [];
        snapshot.forEach(doc => {
            reviews.push(doc.data());
        });
        res.json(reviews);
    } catch (error) {
        console.error('Error getting reviews:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/update-review', upload_img.single('file'), async (req, res) => {
    try {
        const reviewData = req.body;
        const reviewID = reviewData.reviewId;

        if (!reviewID) {
            return res.status(400).json({ error: 'Review ID is required' });
        }

        const reviewRef = database.collection('review').doc(reviewID);
        const doc = await reviewRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Review not found' });
        }

        const updatedReviewData = {};
        if (reviewData.name) {
            updatedReviewData.name = reviewData.name;
        }
        if (reviewData.rating) {
            updatedReviewData.rating = reviewData.rating;
        }
        if (reviewData.reviewEN) {
            updatedReviewData.reviewEN = reviewData.reviewEN;
        }
        if (reviewData.reviewCZ) {
            updatedReviewData.reviewCZ = reviewData.reviewCZ;
        }

        await reviewRef.update(updatedReviewData);

        return res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
        console.error('Error updating review:', error);
        return res.status(500).json({ error: 'Failed to update review' });
    }
});

router.get('/img', async function (req, res, next) {
    const storage = admin.storage();

    async function getAllImageUrls(folderPath) {
        try {
            const bucket = storage.bucket();
            const [files] = await bucket.getFiles({ prefix: folderPath });

            const imageInfoArray = [];
            for (const file of files) {
                if (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png') || file.name.endsWith('.JPEG') || file.name.endsWith('.JPG')) {
                    const url = await file.getSignedUrl({
                        action: 'read',
                        expires: '03-01-2500'
                    });

                    imageInfoArray.push({
                        name: file.name,
                        url: url[0]
                    });
                }
            }

            return imageInfoArray;
        } catch (error) {
            console.error('Error getting image URLs:', error);
            return [];
        }
    }

    try {
        const imageInfoArray = await getAllImageUrls(req.query.folder);
        res.send(imageInfoArray);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.delete('/delete', async (req, res) => {
    try {
        const imageName = req.body.name;
        const bucketName = 'restaurace-1e61e.appspot.com';
        await admin.storage().bucket(bucketName).file(`${imageName}`).delete();
        res.status(200).send('Image deleted successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/upload-img', upload_img.array('files'), (req, res) => {
    const files = req.files;
    const folderName = req.body.folder;
    const bucketName = 'restaurace-1e61e.appspot.com';
    if (!files || files.length === 0) {
        return res.status(400).send('No file uploaded');
    }
    const uploadPromises = files.map(file => {
        return new Promise((resolve, reject) => {
            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.originalname}`;
            const fileBuffer = file.buffer;

            const blob = admin.storage().bucket(bucketName).file(`${folderName}/${fileName}`);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            blobStream.on('error', (error) => {
                console.error('Error uploading file:', error);
                reject(error);
            });

            blobStream.on('finish', () => {
                console.log('File uploaded successfully');
                resolve(fileName);
            });

            blobStream.on('progress', (progress) => {
                const fileProgressPercentage = (progress.bytesWritten / progress.totalBytes) * 100;
                console.log(`File "${fileName}" uploaded: ${fileProgressPercentage.toFixed(2)}%`);
            });

            blobStream.end(fileBuffer);
        });
    });

    Promise.all(uploadPromises)
        .then((fileNames) => {
            res.send(`Files uploaded successfully: ${fileNames.join(', ')}`);
        })
        .catch((error) => {
            res.status(500).send('Internal Server Error');
        });
});

router.get('/menu', async function (req, res, next) {
    const storage = admin.storage();

    async function getMenu(folderPath) {
        try {
            const bucket = storage.bucket();
            const [files] = await bucket.getFiles({ prefix: folderPath });

            const imageInfoArray = [];
            for (const file of files) {
                if (file.name.endsWith('.pdf')) {
                    const url = await file.getSignedUrl({
                        action: 'read',
                        expires: '03-01-2500'
                    });
                    imageInfoArray.push({
                        name: file.name,
                        url: url[0]
                    });
                }
            }

            return imageInfoArray;
        } catch (error) {
            console.error('Error getting image URLs:', error);
            return [];
        }
    }
    try {
        const imageInfoArray = await getMenu(req.query.folder);
        res.send(imageInfoArray);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
})
router.post('/update-menu', upload_img.single('file'), (req, res) => {
    const file = req.file;
    const menuName = req.body.menu_name
    const bucketName = 'restaurace-1e61e.appspot.com';
    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    const fileName = file.originalname;
    const fileBuffer = file.buffer;

    const folderName = req.body.folder;
    const oldFileRef = admin.storage().bucket(bucketName).file(`${menuName}`);
    oldFileRef.delete()
        .then(() => {
            const newFileRef = admin.storage().bucket(bucketName).file(`${folderName}/${fileName}`);
            const blobStream = newFileRef.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            blobStream.on('error', (error) => {
                console.error('Error uploading file:', error);
                res.status(500).send('Internal Server Error');
            });

            blobStream.on('finish', () => {
                console.log('File uploaded successfully');
                res.status(200).send('File uploaded successfully');
            });
            blobStream.on('progress', (progress) => {
                const fileProgressPercentage = (progress.bytesWritten / progress.totalBytes) * 100;
                console.log(`File "${fileName}" uploaded: ${fileProgressPercentage.toFixed(2)}%`);
                res.status(200).json({ fileName: fileName, progress: fileProgressPercentage.toFixed(2) });
            });
            blobStream.end(fileBuffer);
        })
        .catch((error) => {
            console.error('Error deleting file:', error);
            res.status(500).send('Internal Server Error');
        });
});
router.post('/add-booking', upload_img.single('file'), async (req, res) => {
    try {
        const { name, telephone, email, persons, date, estimatedTime, note } = req.body;

        if (!name || !telephone || !email || !persons || !date || !estimatedTime) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const bookingDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Prague" }));
        // Validate required fields
        const bookingRef = database.collection('booking');
        const dateTimeParts = date.split('T');
        const newBooking = {
            name: name,
            telephone: telephone,
            email: email,
            persons: persons,
            date: dateTimeParts[1] +' - '+dateTimeParts[0],
            estimatedTime: estimatedTime,
            note: note,
            status: '0',
            createdAt: bookingDate// Optional: add timestamp
        };

        // Add new review to the Firestore collection
        const addedBooking = await bookingRef.add(newBooking);
        const nodemailer = require('nodemailer');
        const fs = require('fs');
     
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
            subject: 'New Booking',
            html: `<h4>Hello, you have a new booking from '${name}'<br>
              <br>
              Name: ${name}<br>
              Email: ${email}<br>
              Telephone: ${telephone}<br>
              Persons: ${persons}<br>
              Date: ${dateTimeParts[0]}<br>
              Time: ${dateTimeParts[1]}<br>
              Estimated Time : ${estimatedTime}<br>
              Note: <br>
              ${note.replace(/\n/g, '<br>')}<br></h4>
              <a href="https://rebrno.cz/booking-re">https://rebrno.cz/booking-re</a>`,
              
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        // Return success response with the new booking ID
        return res.status(200).json({ message: 'Booking added successfully', bookingID: addedBooking.id });
    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ error: 'Failed to add booking' });
    }
});
module.exports = router;
