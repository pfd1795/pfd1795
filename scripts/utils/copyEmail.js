import translations from '../lang/translations.json' with { type: 'json' };
import { currentLanguage } from '../lang/translations.config.js';

let notifyTimer;

function showNotification(message, isError = false) {
  const notifications = document.querySelectorAll('.copy-notification');

  if (notifications.length === 0) return;

  notifications.forEach((notification) => {
    notification.textContent = message;
    notification.classList.toggle('copy-notification--error', isError);
    notification.classList.add('show');
  });

  clearTimeout(notifyTimer);
  notifyTimer = setTimeout(() => {
    notifications.forEach((notification) => notification.classList.remove('show'));
  }, 2000);
}

function fallbackCopy(text) {
  const area = document.createElement('textarea');

  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'absolute';
  area.style.left = '-9999px';
  document.body.appendChild(area);
  area.select();

  let copied = false;

  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  } finally {
    document.body.removeChild(area);
  }

  return copied;
}

function notifyResult(copied, texts) {
  if (copied) {
    showNotification(texts.copyNotification);
    return;
  }

  showNotification(texts.copyEmailError, true);
}

export function copyEmail() {
  const email = 'pfd1795@gmail.com';
  const texts = translations.header[currentLanguage] ?? translations.header.es;

  if (!navigator.clipboard?.writeText) {
    notifyResult(fallbackCopy(email), texts);
    return;
  }

  navigator.clipboard.writeText(email)
    .then(() => notifyResult(true, texts))
    .catch(() => notifyResult(fallbackCopy(email), texts));
}
