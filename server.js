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

// Helper function to parse date from filename (dd_mm_yyyy format)
function parseDateFromFilename(filename) {
  // Match patterns like: 03_05_2026, 03_05_26, 03.05.2026, etc.
  const dateMatch = filename.match(/^(\d{2})[._](\d{2})[._](\d{2,4})/);
  if (!dateMatch) return new Date(0); // Return epoch if no match
  
  let [, day, month, year] = dateMatch;
  
  // Normalize 2-digit year to 4-digit
  if (year.length === 2) {
    year = '20' + year;
  }
  
  // Create date object (month is 0-indexed in JS)
  return new Date(year, parseInt(month) - 1, parseInt(day));
}

app.get('/api/notes', (req, res) => {
  const notesDir = path.join(__dirname, 'notes');
  fs.readdir(notesDir, (err, files) => {
    if (err) return res.status(500).send("Couldn't read notes.");
    const mdFiles = files.filter(f => f.endsWith('.md'));
    const allNotes = mdFiles.map(file => {
      const content = fs.readFileSync(path.join(notesDir, file), 'utf8');
      return { filename: file, content, date: parseDateFromFilename(file) };
    });
    
    // Sort by date, newest first
    allNotes.sort((a, b) => b.date - a.date);
    
    // Remove date field before sending (only needed for sorting)
    allNotes.forEach(note => delete note.date);
    
    res.json(allNotes);
  });
});

//To start server run - node server.js in a terminal

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
