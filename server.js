const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ 
  dest: 'uploads/',
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  }
});

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  
  // Construct the URL for the uploaded image
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  
  res.status(200).json({ imageUrl });
  console.log("Image sent to client");
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
