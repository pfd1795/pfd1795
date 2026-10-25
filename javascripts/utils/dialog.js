export function OpenModalDialog() {
  const dialog = document.querySelector(".modal-dialog");

  if (!dialog) return;

  if (!dialog.open) {
    dialog.showModal();
    document.body.classList.add("modal-open");
  }
}

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

  OpenModalDialog();
}

export function CloseModalDialog() {
  const dialog = document.querySelector(".modal-dialog");

  if (!dialog) return;

  if (dialog.open) {
    dialog.close();
    document.body.classList.remove("modal-open");
  }
}

export function InitModalDialog() {
  const dialog = document.querySelector(".modal-dialog");

  if (!dialog) return;

  const btnClose = dialog.querySelector(".modal-close");

  btnClose?.addEventListener("click", CloseModalDialog);

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      CloseModalDialog();
    }
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });
}
