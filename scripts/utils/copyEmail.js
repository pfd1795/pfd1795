export default function copyEmail() {
    const email = "pfd1795@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
        const notification = document.getElementById("copyNotification");
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 2000);
    }).catch(err => {
        console.error("Error al copiar:", err);
    });
}