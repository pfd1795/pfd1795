function setModalState(isOpen) {
  document.body.classList.toggle("modal-open", isOpen);
  document.body.classList.toggle("modal-closed", !isOpen);
}

function OpenModalDialog() {
  const dialog = document.querySelector(".modal-dialog");

  if (!dialog) return;

  if (!dialog.open) {
    dialog.showModal();
    setModalState(true);
  }
}

export function ModalDialog(content = '') {
  const dialog = document.querySelector(".modal-dialog");
  const modalBody = document.querySelector(".modal-dialog-body");

  if (!dialog || !modalBody) return;
  if (typeof content !== 'string' && !(content instanceof HTMLElement)) return;

  modalBody.innerHTML = "";

  if (content instanceof HTMLElement) {
    modalBody.appendChild(content);
  } else {
    modalBody.innerHTML = content;
  }

  OpenModalDialog();
}

function CloseModalDialog() {
  const dialog = document.querySelector(".modal-dialog");

  if (!dialog) return;

  if (dialog.open) {
    dialog.close();
    setModalState(false);
  }
}

export function InitModalDialog() {
  const dialog = document.querySelector(".modal-dialog");

  if (!dialog) return;

  setModalState(false);

  const btnClose = dialog.querySelector(".modal-close");

  btnClose?.addEventListener("click", CloseModalDialog);

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      CloseModalDialog();
    }
  });

  dialog.addEventListener("close", () => {
    setModalState(false);
  });
}
