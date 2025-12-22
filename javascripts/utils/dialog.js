export function ModalDialog(content = "contenido...") {
  const dialog = document.querySelector(".modal-dialog");
  const modalBody = document.querySelector(".modal-dialog-body");

  if (!dialog || !modalBody) return;

  modalBody.innerHTML = "";

  if (content instanceof HTMLElement) {
    modalBody.appendChild(content);
  } else {
    modalBody.innerHTML = content;
  }

  if (!dialog.open) dialog.showModal();

  document.body.style = "overflow-y: hidden;";
}

export function CloseModalDialog() {
  const dialog = document.querySelector(".modal-dialog");
  if (!dialog) return;

  if (dialog.open) dialog.close();

  document.body.style = "overflow-y: scroll;";
}

function InitModalDialog() {
  const dialog = document.querySelector(".modal-dialog");
  const btnClose = dialog.querySelector(".btn");

  btnClose?.addEventListener("click", CloseModalDialog);

  dialog?.addEventListener("click", (e) => {
    const rect = (e.target).getBoundingClientRect();
    const clickedInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!clickedInside) CloseModalDialog();
  });

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { CloseModalDialog(); } });
}

document.addEventListener("DOMContentLoaded", InitModalDialog);