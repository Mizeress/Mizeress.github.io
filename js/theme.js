
(function() {
    const root = document.documentElement;
    const toggle = document.getElementById('appearanceToggle');
    const icon = document.getElementById('toggleIcon');
    const label = document.getElementById('toggleLabel');

    function applyMode(mode) {
    if (mode === 'light') {
        root.classList.add('light');
        toggle.setAttribute('aria-pressed', 'false');
        icon.className = 'bi bi-sun-fill';
        label.textContent = 'Light';
    } else {
        root.classList.remove('light');
        toggle.setAttribute('aria-pressed', 'true');
        icon.className = 'bi bi-moon-fill';
        label.textContent = 'Dark';
    }
    }

    function currentMode() {
    const saved = localStorage.getItem('appearance');
    if (saved) return saved;
    return 'dark';
    }

    applyMode(currentMode());

    toggle.addEventListener('click', function() {
    const newMode = (root.classList.contains('light')) ? 'dark' : 'light';
    localStorage.setItem('appearance', newMode);
    applyMode(newMode);
    });
})();