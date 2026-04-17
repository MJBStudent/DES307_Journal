const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname))); // serve index.html and styles.css

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => {
  const notesDir = path.join(__dirname, 'notes');
  fs.readdir(notesDir, (err, files) => {
    if (err) return res.status(500).send("Couldn't read notes.");
    const mdFiles = files.filter(f => f.endsWith('.md'));
    const allNotes = mdFiles.map(file => {
      const content = fs.readFileSync(path.join(notesDir, file), 'utf8');
      return { filename: file, content };
    });
    res.json(allNotes);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
