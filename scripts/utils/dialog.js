function setModalState(isOpen) {
  document.body.classList.toggle('modal-open', isOpen);
  document.body.classList.toggle('modal-closed', !isOpen);
}

function OpenModalDialog() {
  const dialog = document.querySelector('.modal-dialog');

  if (!dialog) return;

  if (!dialog.open) {
    dialog.showModal();
    setModalState(true);
  }
}

function ensureModalHeader(dialog) {
  const modalBody = dialog.querySelector('.modal-dialog-body');
  const closeButton = dialog.querySelector('.modal-close');

  if (!modalBody || !closeButton) return null;

  let header = dialog.querySelector('.modal-dialog-header');

  if (!header) {
    header = document.createElement('header');
    header.className = 'modal-dialog-header';
    dialog.insertBefore(header, modalBody);
    header.appendChild(closeButton);
  }

  return header;
}

export function ModalDialog(content = '') {
  const dialog = document.querySelector('.modal-dialog');
  const modalBody = document.querySelector('.modal-dialog-body');

  if (!dialog || !modalBody) return;
  if (typeof content !== 'string' && !(content instanceof HTMLElement)) return;

  modalBody.innerHTML = '';

  if (content instanceof HTMLElement) {
    modalBody.appendChild(content);
  } else {
    modalBody.innerHTML = content;
  }

  modalBody.scrollTop = 0;

  const header = ensureModalHeader(dialog);

  if (header) {
    const title = modalBody.querySelector('#modal-title');
    const previousTitle = header.querySelector('#modal-title');

    previousTitle?.remove();

    if (title) {
      header.insertBefore(title, header.firstChild);
    }
  }

  OpenModalDialog();
}

function CloseModalDialog() {
  const dialog = document.querySelector('.modal-dialog');

  if (!dialog) return;

  if (dialog.open) {
    dialog.close();
    setModalState(false);
  }
}

export function InitModalDialog() {
  const dialog = document.querySelector('.modal-dialog');

  if (!dialog) return;

  setModalState(false);

  const header = ensureModalHeader(dialog);
  const btnClose = header?.querySelector('.modal-close') ?? dialog.querySelector('.modal-close');

  btnClose?.addEventListener('click', CloseModalDialog);

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      CloseModalDialog();
    }
  });

  dialog.addEventListener('close', () => {
    setModalState(false);
  });
}
