const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const { admin, database } = require('./firestore');
const multer = require('multer');
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))
const upload_img = multer({
    storage: multer.memoryStorage()
})

router.get('/', async function (req, res, next) {
    try {
       const bookingRef = database.collection('booking');
        const page = parseInt(req.query.page) || 1;
        const pageSize = 20;
        const lastVisible = req.query.lastVisible || null;
      
        let query = bookingRef.orderBy('createdAt', 'desc').limit(pageSize);

        if (lastVisible && page > 1) {
            const lastDoc = await bookingRef.doc(lastVisible).get();
            query = query.startAfter(lastDoc);
        }

        const snapshot = await query.get();
        const bookings = [];
        let lastDocId = null;

        snapshot.docs.forEach(doc => {
            bookings.push({id:doc.id, ...doc.data()});
            lastDocId = doc.id;
        });

        res.render('booking', {
            title: 'Booking',
            bookings,
            currentPage: page,
            lastVisible: lastDocId, // Truyền id cuối cùng cho trang tiếp theo
            hasMore: snapshot.size === pageSize // Kiểm tra nếu còn bản ghi để phân trang
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Error fetching bookings');
    }
});
router.post('/update-booking', upload_img.single('file'), async (req, res) => {
    try {
        const bookingData = req.body;
        const bookingRef = database.collection('booking').doc(bookingData.id); 

        if (!bookingData.email || !bookingData.status || !bookingData.content || !bookingData.id) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate required fields
      
        const nodemailer = require('nodemailer');
        const fs = require('fs');
        const { email, status, content } = req.body;
     
        const transporter = nodemailer.createTransport({
            host: 'smtp.seznam.cz',
            port: 465,
            secure: true,
            auth: {
                user: 're.brno@seznam.cz',
                pass: 'Rebrno2023'
            }
        });

        const mailOptions = {
            from: 're.brno@seznam.cz',
            to: email,
            subject: 'Booking RỄSTAURACE',
            html: `${content}`,
        };

        await transporter.sendMail(mailOptions);
        const updateBooking = {
            status: bookingData.status,
        };
        await bookingRef.update(updateBooking);
        
        // Return success response with the new booking ID
        return res.status(200).json({ message: 'Booking updated successfully', bookingID: bookingData.id });
    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ error: 'Failed to updated booking' });
    }
});
// Route để xóa một tài liệu theo ID
router.delete('/delete/:id', async function (req, res) {
    try {
        const bookingId = req.params.id;  // Lấy ID từ URL

        const bookingRef = database.collection('booking').doc(bookingId);

        // Kiểm tra nếu tài liệu tồn tại trước khi xóa
        const doc = await bookingRef.get();
        if (!doc.exists) {
            return res.status(404).send('Booking not found');
        }

        // Xóa tài liệu
        await bookingRef.delete();

        res.status(200).send('Booking deleted successfully');
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).send('Error deleting booking');
    }
});
module.exports = router;