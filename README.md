# An African Bookshelf 📚

A static website for **An African Bookshelf**, a Kampala-based book club that explores African literature by reading 12 African-authored books a year (one per month).

The site is built with **vanilla HTML, CSS, and JavaScript** (no frameworks, no build tools, no runtime dependencies), designed for immediate deployment on **GitHub Pages**.

---

## 🌟 Features

- **No Frameworks / No Build Tools**: Zero dependencies — runs straight out of the box in any browser.
- **Strict Relative Linking**: Compatible with GitHub Pages repository subpaths (e.g., `username.github.io/anafricanbookshelf_website/`).
- **Dynamic Book Data**: Current monthly read is dynamically fetched and rendered from [`data/books.json`](./data/books.json) with static HTML fallbacks for accessibility and SEO.
- **Design System**: Warm off-white background (`#FAF7F2`) with brand accent colors (ochre yellow, brick red, forest green, teal, and deep blue), editorial serif typography (`Fraunces`), clean body sans (`Plus Jakarta Sans`), and accessible contrast ratios.
- **Community Initiatives**: Highlights Kampala projects including poetry/arts events, local activist stories, neighbourhood book-exchange shelves, and digital archives.
- **Interactive Mobile Nav & Form**: Mobile hamburger navigation with keyboard/focus management, and client-side newsletter confirmation.

---

## 📁 Project Structure

```text
anafricanbookshelf_website/
├── index.html              # Landing page (Hero, Current Read, Projects, Signup, Footer)
├── about.html              # About page (mission, history, values)
├── books.html              # 2026 Reading list catalog & archive
├── projects.html           # 4 Community initiatives
├── blog.html               # Literary essays & reading reflections
├── membership.html         # Join the club & meetup info
├── contact.html            # Contact & Kampala collaboration inquiries
├── css/
│   └── style.css           # Shared mobile-first stylesheet & CSS custom properties
├── js/
│   └── main.js             # Shared navigation, dynamic book fetcher & form states
├── data/
│   └── books.json          # 2026 Reading list metadata (month, year, title, author, status)
├── images/
│   ├── logo.svg            # Vector logo mark
│   └── favicon.svg         # SVG favicon
├── .gitignore              # Ignores macOS artifacts (.DS_Store) and logs
└── README.md               # Project documentation
```

---

## 💻 Local Development

You can preview the site locally using any static web server:

```bash
# Python 3
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🚀 Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/(root)`
4. Click **Save**. Your site will be live within 1–2 minutes!
