/* =====================================================
   THEME TOGGLE (Light/Dark Mode)
   ===================================================== */
const themeToggleBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || 'dark';

// Set initial theme
document.documentElement.setAttribute('data-theme', initialTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* =====================================================
   GITHUB REPOSITORIES INTEGRATION (Load All)
   ===================================================== */
async function loadGitHubRepos() {
  const grid = document.getElementById('reposGrid');
  if (!grid) return;

  const username = 'AmanMInz-in';
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
    if (!res.ok) throw new Error('Failed to fetch repositories');
    
    const repos = await res.json();
    
    // Filter out forks so only original projects are shown
    const originalRepos = repos.filter(repo => !repo.fork);

    if (originalRepos.length === 0) {
      grid.innerHTML = '<div style="color: var(--text-3); grid-column: 1/-1; text-align: center; padding: 40px; font-size: 1.1rem;">No public repositories found.</div>';
      return;
    }

    grid.innerHTML = originalRepos.map((repo, i) => {
      // Map colors to common programming languages for the colored dot
      const langColors = {
        javascript: '#f1e05a',
        html: '#e34c26',
        css: '#563d7c',
        python: '#3572A5',
        typescript: '#3178c6',
        java: '#b07219',
        c: '#555555',
        'c++': '#f34b7d'
      };
      const lang = repo.language ? repo.language.toLowerCase() : '';
      const dotColor = langColors[lang] || '#8b949e';

      return `
        <div class="repo-card" style="opacity: 0; transform: translateY(20px); animation: fadeInUp 0.5s forwards; animation-delay: ${i * 40}ms">
          <div class="repo-header">
            <div class="repo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <a href="${repo.html_url}" target="_blank" class="repo-link" aria-label="View on GitHub" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
          <h3 class="repo-title">${repo.name}</h3>
          <p class="repo-desc">${repo.description || 'No description available for this repository.'}</p>
          <div class="repo-footer">
            ${repo.language ? `
              <div class="repo-lang">
                <span class="lang-dot" style="background-color: ${dotColor}"></span>
                <span>${repo.language}</span>
              </div>
            ` : '<div></div>'}
            <div class="repo-stats">
              <div class="repo-stat" title="Stars">
                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>${repo.stargazers_count}</span>
              </div>
              <div class="repo-stat" title="Forks">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 15V9a4 4 0 0 0-4-4H9"></path><line x1="6" y1="9" x2="6" y2="15"></line></svg>
                <span>${repo.forks_count}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error('GitHub API load error:', err);
    grid.innerHTML = '<div style="color: var(--text-3); grid-column: 1/-1; text-align: center; padding: 40px; font-size: 1.1rem;">Failed to load GitHub repositories.</div>';
  }
}

// Load on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadGitHubRepos);
