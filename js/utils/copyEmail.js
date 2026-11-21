import translations from '../lang/translations.json' with { type: 'json' };
import { currentLanguage } from '../lang/translations.config.js';

let notifyTimer; // compartido entre llamadas para reiniciar el aviso en cada clic

function showNotification(message, isError = false) {
  const notifications = document.querySelectorAll('.copy-notification');

  if (notifications.length === 0) return;

  notifications.forEach((notification) => {
    notification.textContent = message;
    notification.classList.toggle('copy-notification--error', isError);
    notification.classList.add('show');
  });

  clearTimeout(notifyTimer); // apaga el aviso solo 2 s después del último clic
  notifyTimer = setTimeout(() => {
    notifications.forEach((notification) => notification.classList.remove('show'));
  }, 2000);
}

export function copyEmail() {
  const email = 'pfd1795@gmail.com';
  const textos = translations.header[currentLanguage] ?? translations.header.es;

  if (!navigator.clipboard) {
    console.warn('Clipboard API not supported');
    showNotification(textos.copyEmailError, true);
    return;
  }

  navigator.clipboard.writeText(email).then(() => {
    showNotification(textos.copyNotification);
  }).catch((err) => {
    console.error('Error copying email:', err);
    showNotification(textos.copyEmailError, true);
  });
}
