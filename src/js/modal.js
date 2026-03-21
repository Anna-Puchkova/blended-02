import { refs } from './refs';
import { hideModal } from './render-function';

export function closeModal(e) {
  if (
    e.target.classList.contains('modal') ||
    e.target.classList.contains('modal__close-btn')
  ) {
    hideModal();
    document.removeEventListener('keydown', closeModalEsc);
    refs.modalProduct.innerHTML = '';
  }
}
export function closeModalEsc(e) {
  if (e.key === 'Escape') {
    hideModal();
    document.removeEventListener('keydown', closeModalEsc);
    refs.modalProduct.innerHTML = '';
  }
}
