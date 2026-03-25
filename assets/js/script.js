/* ================================================================
   Sole_f1t Blog — script.js
   ================================================================ */

// ===== Sidebar Toggle =====
const sidebar   = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.sidebar .toggle');
const mainEl    = document.querySelector('.l-main');

if (sidebar && toggleBtn) {
  const KEY = 'sf1t-sidebar';
  const saved = localStorage.getItem(KEY);
  if (saved === 'open') sidebar.classList.remove('closed');
  // else: sidebar keeps its default 'closed' from HTML

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    localStorage.setItem(KEY, sidebar.classList.contains('closed') ? 'closed' : 'open');
  });

  // Clicking search box when closed should open sidebar
  const searchBox = document.querySelector('.search-box');
  if (searchBox) {
    searchBox.addEventListener('click', () => {
      if (sidebar.classList.contains('closed')) {
        sidebar.classList.remove('closed');
        localStorage.setItem(KEY, 'open');
        const inp = searchBox.querySelector('input');
        if (inp) setTimeout(() => inp.focus(), 320);
      }
    });
  }
}

// ===== Active nav link =====
(function markActive() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu-links a, .mobile-nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    a.classList.toggle('active', href === page);
  });
})();

// ===== Typewriter skill animation (home page) =====
const skillWordEl = document.getElementById('skill-word');
if (skillWordEl) {
  const skills = [
    'Web Exploitation', 'Cryptography', 'Python', 'Burp Suite',
    'SQL Injection', 'XSS', 'JWT', 'Wireshark', 'Linux',
    'CTF', 'Docker', 'Bash', 'SSRF', 'IDOR', 'LFI/RFI',
    'Binary Exploitation', 'Reverse Engineering', 'Pwntools',
    'Neovim', 'OSINT', 'Steganography', 'API Security',
  ];

  const cursor = document.createElement('span');
  cursor.className = 'skill-cursor';
  skillWordEl.insertAdjacentElement('afterend', cursor);

  let i = 0, c = 0, del = false;

  function type() {
    const w = skills[i];
    skillWordEl.textContent = del ? w.slice(0, --c) : w.slice(0, ++c);
    if (!del && c === w.length) { del = true; return setTimeout(type, 1700); }
    if (del && c === 0)         { del = false; i = (i + 1) % skills.length; return setTimeout(type, 400); }
    setTimeout(type, del ? 40 : 70);
  }
  type();
}

// ===== Scroll-to-top =====
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== Search page =====
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput && searchResults) {
  // All searchable items across the site
  const items = [
    { title: 'About Me',           desc: 'Nguyen Huu Duy Nhat — HCMUTE, Information Security student.',    icon: 'bx bx-user',          cat: 'About',        url: 'about.html'        },
    { title: 'Sharkbait CTF Team', desc: 'Member of Sharkbait CTF Team — global competitions.',             icon: 'bx bx-shield',        cat: 'About',        url: 'about.html'        },
    { title: 'HCMUTE ISC Gen 2',   desc: 'Member of HCMUTE Information Security Club.',                    icon: 'bx bx-group',         cat: 'About',        url: 'about.html'        },
    { title: 'Experience',         desc: 'CTF competitions, security research, team activities.',            icon: 'bx bx-briefcase',     cat: 'Experience',   url: 'experience.html'   },
    { title: 'Projects',           desc: 'Personal security tools, CTF frameworks, labs.',                  icon: 'bx bx-code-alt',      cat: 'Projects',     url: 'projects.html'     },
    { title: 'Blog',               desc: 'Articles, tutorials, and insights on cybersecurity.',             icon: 'bx bx-news',          cat: 'Blog',         url: 'blog.html'         },
    { title: 'Writeups',           desc: 'CTF writeups: Web Exploitation, Cryptography, Pwn.',             icon: 'bx bx-edit-alt',      cat: 'Writeups',     url: 'writeups.html'     },
    { title: 'Certificates',       desc: 'Security certifications and course completions.',                  icon: 'bx bx-certification', cat: 'Certificates', url: 'certificates.html' },
    { title: 'Rewards',            desc: 'CTF competition awards and achievements.',                         icon: 'bx bx-trophy',        cat: 'Rewards',      url: 'rewards.html'      },
    { title: 'Contact',            desc: 'Email, GitHub, Facebook, Discord — get in touch.',                icon: 'bx bx-envelope',      cat: 'Contact',      url: 'contact.html'      },
  ];

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    const filtered = q ? items.filter(x =>
      x.title.toLowerCase().includes(q) ||
      x.desc.toLowerCase().includes(q)  ||
      x.cat.toLowerCase().includes(q)
    ) : [];

    if (!q) {
      searchResults.innerHTML = '<p class="no-results">Type something to search…</p>';
      return;
    }
    if (!filtered.length) {
      searchResults.innerHTML = '<p class="no-results">No results found for "<strong>' + query + '</strong>"</p>';
      return;
    }
    searchResults.innerHTML = filtered.map(r => `
      <a href="${r.url}" class="search-result-item">
        <div class="result-icon"><i class="${r.icon}"></i></div>
        <div class="result-text">
          <div class="result-title">${r.title}</div>
          <div class="result-desc">${r.desc}</div>
        </div>
        <span class="result-category">${r.cat}</span>
      </a>`).join('');
  }

  searchInput.addEventListener('input', e => renderResults(e.target.value));
  renderResults('');

  // URL param pre-fill
  const q = new URLSearchParams(location.search).get('q');
  if (q) { searchInput.value = q; renderResults(q); }
}

// Sidebar search → navigate to search.html
const sidebarSearch = document.querySelector('.sidebar .search-box input');
if (sidebarSearch) {
  sidebarSearch.addEventListener('keydown', e => {
    if (e.key === 'Enter' && sidebarSearch.value.trim()) {
      // Find search.html relative path
      const depth = location.pathname.split('/').length - 2; // pages at root vs subdir
      const base = depth > 0 ? '../'.repeat(depth) : '';
      window.location.href = base + 'search.html?q=' + encodeURIComponent(sidebarSearch.value.trim());
    }
  });
}

// ===== Writeup Categories Expand/Collapse =====
document.addEventListener('DOMContentLoaded', () => {
  // Category headers
  document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', () => {
      const section = header.parentElement;
      const isExpanded = section.classList.contains('expanded');
      
      // Close all other categories
      document.querySelectorAll('.category-section').forEach(s => {
        if (s !== section) {
          s.classList.remove('expanded');
          // Also close all platforms inside
          s.querySelectorAll('.platform-section').forEach(p => p.classList.remove('expanded'));
        }
      });
      
      // Toggle current category
      section.classList.toggle('expanded', !isExpanded);
      
      // If closing, also close all platforms inside
      if (isExpanded) {
        section.querySelectorAll('.platform-section').forEach(p => p.classList.remove('expanded'));
      }
    });
  });
  
  // Platform headers
  document.querySelectorAll('.platform-header').forEach(header => {
    header.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent category toggle
      const section = header.parentElement;
      const isExpanded = section.classList.contains('expanded');
      
      // Close all other platforms in the same category
      const category = section.closest('.category-section');
      category.querySelectorAll('.platform-section').forEach(p => {
        if (p !== section) {
          p.classList.remove('expanded');
        }
      });
      
      // Toggle current platform
      section.classList.toggle('expanded', !isExpanded);
    });
  });
});
