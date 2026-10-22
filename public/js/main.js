const CONTACT_EMAIL = 'RobertMajka254@gmail.com';

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 70);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Footer year
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form: opens the visitor's mail app with the message pre-filled.
// No backend needed, so it works on GitHub Pages as-is.
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

function setStatus(message, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.toggle('is-error', isError);
}

if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            setStatus('Please fill in your name, a valid email and a message.', true);
            return;
        }

        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const message = form.elements.message.value.trim();

        const subject = `Portfolio message from ${name}`;
        const body = `${message}\n\n— ${name}\n${email}`;
        const mailto = `mailto:${CONTACT_EMAIL}`
            + `?subject=${encodeURIComponent(subject)}`
            + `&body=${encodeURIComponent(body)}`;

        try {
            window.location.href = mailto;
            setStatus(`Your email app should open with the message ready to send. If nothing happened, email ${CONTACT_EMAIL} directly or use the copy button.`);
        } catch (err) {
            console.error('Could not open mail app:', err);
            setStatus(`Couldn't open your email app. Please email ${CONTACT_EMAIL} directly.`, true);
        }
    });
}

// Copy email button, with a fallback for browsers that block the Clipboard API
const copyBtn = document.getElementById('copy-email');

async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.setAttribute('readonly', '');
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    const ok = document.execCommand('copy'); // legacy fallback only; deprecated but still the only option without the Clipboard API
    document.body.removeChild(temp);
    if (!ok) throw new Error('execCommand copy failed');
}

if (copyBtn) {
    const originalLabel = copyBtn.textContent;
    copyBtn.addEventListener('click', async () => {
        try {
            await copyText(CONTACT_EMAIL);
            copyBtn.textContent = 'Copied!';
        } catch (err) {
            console.error('Copy failed:', err);
            copyBtn.textContent = CONTACT_EMAIL;
        }
        setTimeout(() => { copyBtn.textContent = originalLabel; }, 2000);
    });
}
