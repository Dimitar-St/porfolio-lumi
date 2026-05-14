const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(PUBLIC_DIR));

// API: return all image paths from a project folder
app.get("/api/gallery/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const folderName = `images-${projectId}`;
  const folderPath = path.join(PUBLIC_DIR, folderName);

  if (!fs.existsSync(folderPath)) {
    return res.json([]);
  }

  const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

  const files = fs.readdirSync(folderPath)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return allowedExtensions.includes(ext);
    })
    .map(file => `/${folderName}/${file}`);

  res.json(files);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
