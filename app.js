const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

// Allow CORS
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/') // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Set the filename to 'a.docx'
    cb(null, 'a.docx');
  }
})
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static("static"));

// Set view engine
app.set("view engine", "hbs");

// Route for rendering index page
app.get("/", (req, res) => {
  res.render("index");
});

// API route for file upload
app.post("/upload", upload.single('file'), (req, res) => {
  // Handle uploaded file here, you can access it through req.file
  // Example response
  res.json({ message: "File uploaded successfully", filename: 'a.docx' });
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
