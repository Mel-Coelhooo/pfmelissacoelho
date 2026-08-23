const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navActions = document.querySelector('.nav-actions');
const navLinks = document.querySelectorAll('.nav-list a');
const themeToggle = document.querySelector('.theme-toggle');
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

// Controla abertura/fechamento do menu mobile.
function toggleMenu(forceClose = false) {
    if (!menuToggle || !navActions) {
        return;
    }

    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    const nextState = forceClose ? false : !isExpanded;

    menuToggle.setAttribute('aria-expanded', String(nextState));
    navActions.classList.toggle('open', nextState);
}

// Aplica o tema e salva a preferencia no navegador.
function applyTheme(theme) {
    body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('portfolio-theme', theme);
}

// Valida formato basico de e-mail.
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Exibe retorno visual de erro ou sucesso no formulario.
function showFeedback(message, type) {
    if (!feedback) {
        return;
    }

    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
}

menuToggle?.addEventListener('click', () => {
    toggleMenu();
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        toggleMenu(true);
    });
});

themeToggle?.addEventListener('click', () => {
    const nextTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(nextTheme);
});

// Mantém a preferência de tema do usuário entre visitas.
applyTheme(localStorage.getItem('portfolio-theme') || 'light');

form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
        showFeedback('Preencha nome, e-mail e mensagem antes de enviar.', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showFeedback('Digite um e-mail em formato válido, como usuario@dominio.com.', 'error');
        return;
    }

    // Simulacao de envio: limpa campos e confirma para o usuario.
    form.reset();
    showFeedback('Mensagem enviada com sucesso!', 'success');
    window.alert('Mensagem enviada com sucesso!');
});