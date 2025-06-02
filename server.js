const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { config } = require('dotenv');
const fs = require('fs');
const cors = require('cors');
// Load env vars
config();

// Cloudinary config
cloudinary.config({
  cloud_name: "dfporfl8y",
  api_key: "244749221557343",
  api_secret: "jDkVlzvkhHjb81EvaLjYgtNtKsY",
});


// Multer setup (store locally first)
const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors()); // Enable CORS for all routes

// Upload endpoint
app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const path = req.file.path;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      resource_type: 'video',
    });

    // Remove local file
    fs.unlinkSync(path);

    res.json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

// Server start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
