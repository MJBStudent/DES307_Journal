## README
17.4.26

npm install dompurify

### DOMPurify Overview

**What it is**  
DOMPurify is a small, fast JavaScript library that sanitizes HTML to remove dangerous markup and attributes that can cause cross site scripting. Use it to clean any HTML produced from Markdown before inserting it into the DOM.

**Why use it**  
- Prevents execution of scripts and inline event handlers.  
- Removes dangerous URIs like `javascript:` in links and image sources.  
- Works in browsers and on the server with jsdom.

---

### Client Side Setup and Example

**Install options**  
- **CDN quick start**: drop these script tags into your HTML.  
- **npm**: `npm install dompurify marked` for a project with build tooling.

**HTML snippet to paste into learning_notes**
```html
<!-- CDN versions for quick prototyping -->
<script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>

<!-- Container where notes will be rendered -->
<div id="notes"></div>

<script>
  // Fetch markdown files bundle from your API
  fetch('/api/notes')
    .then(res => res.json())
    .then(notes => {
      const out = document.getElementById('notes');
      notes.forEach(note => {
        // Convert Markdown to HTML
        const rawHtml = marked.parse(note.content);
        // Sanitize the HTML
        const safeHtml = DOMPurify.sanitize(rawHtml);
        // Insert into the page
        const article = document.createElement('article');
        article.className = 'md-content';
        article.innerHTML = safeHtml;
        out.appendChild(article);
      });
    })
    .catch(err => console.error('Failed to load notes', err));
</script>
```

**NPM usage in a bundler environment**  
```bash
npm install marked dompurify
```
```js
// main.js
import { marked } from 'marked';
import DOMPurify from 'dompurify';

fetch('/api/notes')
  .then(r => r.json())
  .then(notes => {
    const out = document.getElementById('notes');
    notes.forEach(n => {
      const raw = marked.parse(n.content);
      const clean = DOMPurify.sanitize(raw);
      const el = document.createElement('article');
      el.className = 'md-content';
      el.innerHTML = clean;
      out.appendChild(el);
    });
  });
```

---

### Server Side Pre Rendering Example

**When to pre render**  
Pre rendering is useful if you want to send ready HTML to clients, reduce client work, or create static snapshots.

**Install for Node**
```bash
npm install marked dompurify jsdom
```

**Server side snippet**
```js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');
const { marked } = require('marked');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const md = fs.readFileSync(path.join(__dirname, 'notes', 'example.md'), 'utf8');
const html = marked.parse(md);
const safe = DOMPurify.sanitize(html);

// safe now contains sanitized HTML you can embed into templates or send as JSON
```

---

### Styling Markdown Output

**Basic CSS to paste**
```css
.md-content {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  line-height: 1.6;
  color: #222;
  max-width: 760px;
  margin: 1.25rem auto;
  padding: 0 1rem;
}

.md-content h1, .md-content h2, .md-content h3 {
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.md-content p {
  margin: 0.5rem 0;
}

.md-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0.75rem 0;
  border-radius: 6px;
}

.md-content pre {
  background: #0b1220;
  color: #e6edf3;
  padding: 0.75rem;
  border-radius: 6px;
  overflow: auto;
}
```

**Image paths**  
- Use your Express static route. Example Markdown image syntax:
```markdown
![Alt text](/images/photo.png)
```
- When published to GitHub Pages, the Pages URL for the image is `https://username.github.io/repo/images/photo.png`.

---

### Security Notes and Best Practices

- **Sanitize everything that could be untrusted**. If you ever paste content from the web or accept notes from others, sanitize before inserting.  
- **Sanitize after all transformations**. Convert Markdown to HTML, then sanitize the final HTML.  
- **Local only**: if the journal stays local and only you edit it, the risk is small, but adding DOMPurify is a tiny, low cost safety improvement.  
- **Server side**: if you pre render on the server, sanitize there too so clients receive safe HTML.  
- **Avoid double sanitization pitfalls**: sanitize once after final HTML generation.

> **Tip** Use CDN scripts for quick prototyping and switch to npm packages when you build or publish.

---

### Quick Checklist to Add DOMPurify to Your Project

- **For quick local prototype**
  - Add CDN tags for `marked` and `DOMPurify` to `index.html`.  
  - Paste the client side snippet into a script block.  
  - Add the CSS snippet to your stylesheet.

- **For a project with npm**
  - Run `npm install marked dompurify`.  
  - Import `marked` and `dompurify` in your client bundle or server code.  
  - Convert Markdown to HTML, call `DOMPurify.sanitize(...)`, then `innerHTML`.

- **For server pre rendering**
  - Run `npm install marked dompurify jsdom`.  
  - Create a JSDOM window and use `createDOMPurify(window)` to sanitize server side.

---

**Paste this whole note into learning_notes** and you will have a compact, copyable reference for adding safe Markdown rendering to your journal.
