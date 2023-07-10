const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const faceapi = require('face-api.js');
const canvas = require('canvas');

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

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

// Load models before handling requests
Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromDisk('models'),
  faceapi.nets.faceLandmark68Net.loadFromDisk('models'),
  faceapi.nets.faceRecognitionNet.loadFromDisk('models')
]).then(() => {
  console.log('Models loaded');
}).catch((error) => {
  console.error('Error loading models:', error);
});

app.post('/upload', upload.single('image'), async (req, res) => {
  console.log(req.file);

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  try {
    // Load the input image
    const img = await canvas.loadImage(imageUrl);

    // Detect faces in the image
    const detections = await faceapi.detectAllFaces(img)
      .withFaceLandmarks()
      .withFaceDescriptors();

    // Draw bounding boxes around the detected faces
    const outImg = faceapi.createCanvasFromMedia(img);
    faceapi.draw.drawDetections(outImg, detections);

    // Convert the modified image to base64 string
    const modifiedImgDataUrl = outImg.toDataURL();

    res.status(200).json({ imageUrl: modifiedImgDataUrl });
    console.log('Modified image sent to client');
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ message: 'Error processing image' });
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
