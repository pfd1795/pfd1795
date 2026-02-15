export function copyEmail() {
  const email = "pfd1795@gmail.com";

  if (!navigator.clipboard) {
    console.warn("Clipboard API not supported");
    return;
  }

  navigator.clipboard.writeText(email).then(() => {
    const notifications = document.querySelectorAll(".copy-notification");
    if (notifications.length === 0) return;

    notifications.forEach(notification => notification.classList.add("show"));

    setTimeout(() => {
      notifications.forEach(notification => notification.classList.remove("show"));
    }, 2000);
  }).catch(err => {
    console.error("Error copying email:", err);
  });
}