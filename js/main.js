/**
 * An African Bookshelf — Shared Main JavaScript
 * Handles:
 * 1. Mobile navigation menu toggle and accessibility
 * 2. Dynamic loading of the "Current Read" from ./data/books.json
 * 3. Client-side newsletter signup with thank-you confirmation state
 * 4. Automatic dynamic copyright year in footer
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCurrentRead();
  initNewsletter();
  initFooterYear();
});

/**
 * 1. Mobile Navigation Toggle & Accessibility
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (!navToggle || !siteNav) return;

  function toggleMenu(isOpen) {
    const expanded = isOpen !== undefined ? isOpen : navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(expanded));
    if (expanded) {
      siteNav.classList.add('is-open');
    } else {
      siteNav.classList.remove('is-open');
    }
  }

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (siteNav.classList.contains('is-open') && !siteNav.contains(e.target) && !navToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      toggleMenu(false);
      navToggle.focus();
    }
  });

  // Close nav on nav-link click (mobile UX)
  const navLinks = siteNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        toggleMenu(false);
      }
    });
  });
}

/**
 * 2. Dynamic Current Read from ./data/books.json
 */
async function initCurrentRead() {
  const container = document.getElementById('current-read-content');
  if (!container) return;

  try {
    const response = await fetch('./data/books.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const books = await response.json();
    if (!Array.isArray(books) || books.length === 0) return;

    // Look for status === "current", otherwise pick the latest book entry in the list
    const currentBook = books.find(b => b.status && b.status.toLowerCase() === 'current') || books[books.length - 1];

    if (!currentBook) return;

    // Render data dynamically into container
    renderCurrentRead(container, currentBook);
  } catch (error) {
    console.warn('Note: Could not dynamically load books.json; retaining static fallback.', error);
  }
}

/**
 * Helper to render the Current Read component
 */
function renderCurrentRead(container, book) {
  const statusBadgeClass = book.status === 'current' ? 'badge-green' : 'badge-ochre';
  const statusText = book.status === 'current' ? 'Currently Reading' : (book.status ? capitalize(book.status) : 'Featured Read');
  const monthYear = `${book.month} ${book.year}`;

  container.innerHTML = `
    <div class="current-read-grid">
      <!-- Mock Stylized Book Cover Visual -->
      <div class="current-read-cover-wrapper">
        <div class="book-cover-mock" role="img" aria-label="Book cover representation for ${escapeHtml(book.title)} by ${escapeHtml(book.author)}">
          <span class="mock-spine-mark">${escapeHtml(monthYear)}</span>
          <h3 class="mock-title">${escapeHtml(book.title)}</h3>
          <span class="mock-author">${escapeHtml(book.author)}</span>
        </div>
      </div>

      <!-- Book Metadata & Actions -->
      <div class="current-read-meta">
        <div class="current-read-badges">
          <span class="badge ${statusBadgeClass}">
            <span class="hero-badge-dot" aria-hidden="true"></span>
            ${escapeHtml(statusText)}
          </span>
          <span class="badge badge-ochre">${escapeHtml(monthYear)}</span>
        </div>

        <h3 class="current-read-title">${escapeHtml(book.title)}</h3>
        <p class="current-read-author">by ${escapeHtml(book.author)}</p>

        <p class="current-read-desc">
          Our selected reading exploration for ${escapeHtml(book.month)}. Join our Kampala bookclub circle for lively dialogue, thematic analysis, and shared perspectives on this African-authored work.
        </p>

        <div class="current-read-actions">
          <a href="./membership.html" class="btn btn-primary">Join This Discussion</a>
          <a href="./books.html" class="btn btn-secondary">View 2026 Reading List &rarr;</a>
        </div>
      </div>
    </div>
  `;
}

/**
 * 3. Newsletter Signup Handler (Client-side confirmation state)
 */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const container = document.getElementById('newsletter-container');

  if (!form || !container) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const emailValue = emailInput ? emailInput.value.trim() : '';

    if (!emailValue) return;

    // Show friendly confirmation state
    container.innerHTML = `
      <div class="newsletter-success" role="alert" aria-live="polite">
        <h3>Thank you for joining our community!</h3>
        <p>We've received your email address (<strong>${escapeHtml(emailValue)}</strong>). We look forward to sharing our monthly book selections, Kampala meetups, and community initiatives with you.</p>
      </div>
    `;
  });
}

/**
 * 4. Automatic Copyright Year
 */
function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Utility: HTML Escape helper to prevent XSS
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Utility: Capitalize first letter
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

