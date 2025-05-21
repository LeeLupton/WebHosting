'use strict';

function setupThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggleBtn.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }

  const storedTheme = localStorage.getItem('theme') || 'light';
  setTheme(storedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = current === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
}

function createCard(app) {
  const card = document.createElement('div');
  card.classList.add('card');

  const link = document.createElement('a');
  link.href = app.url;
  link.classList.add('card-link');

  const img = document.createElement('img');
  img.src = app.icon;
  img.alt = app.name;
  img.classList.add('card-image');

  const title = document.createElement('h2');
  title.textContent = app.name;
  title.classList.add('card-title');

  const description = document.createElement('p');
  description.textContent = app.description;
  description.classList.add('card-description');

  link.appendChild(img);
  link.appendChild(title);
  link.appendChild(description);
  card.appendChild(link);
  return card;
}

function loadApps() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  fetch('apps.json')
    .then(response => response.json())
    .then(apps => {
      apps.forEach(app => {
        gallery.appendChild(createCard(app));
      });
    })
    .catch(error => {
      console.error('Error loading apps:', error);
      gallery.textContent = 'Failed to load applications.';
    });
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

function setupForm() {
  const form = document.getElementById('applicationForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Application submitted!');
  });
}

function setupVideoEnd() {
  const video = document.querySelector('video');
  if (!video) return;
  video.addEventListener('ended', () => {
    alert('Thank you for watching!');
  });
}

function init() {
  setupThemeToggle();
  loadApps();
  setupSearch();
  setupForm();
  setupVideoEnd();
}

document.addEventListener('DOMContentLoaded', init);
