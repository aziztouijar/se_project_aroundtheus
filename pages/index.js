import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

// Validation configuration
const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_type_error',
  errorClass: 'modal__error_visible'
};

// Full initial cards list (from original project)
const initialCards = [
  { name: 'Yosemite Valley', link: 'https://code.s3.yandex.net/web-code/yosemite.jpg' },
  { name: 'Lake Louise', link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg' },
  { name: 'Bald Mountains', link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg' },
  { name: 'Latemar', link: 'https://code.s3.yandex.net/web-code/latemar.jpg' },
  { name: 'Vanoise National Park', link: 'https://code.s3.yandex.net/web-code/vanoise.jpg' },
  { name: 'Lago di Braies', link: 'https://code.s3.yandex.net/web-code/lago.jpg' }
];

// Selectors
const cardsContainer = document.querySelector('.cards__list');
const cardTemplateSelector = '#card-template';
const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

// Add Card Modal
const addCardModal = document.querySelector('#add-card-modal');
const cardForm = addCardModal.querySelector('.modal__form');
const cardTitleInput = cardForm.querySelector('#card-title-input');
const cardLinkInput = cardForm.querySelector('#card-link-input');

// Edit Profile Modal
const editProfileModal = document.querySelector('#profile-edit-modal');
const editForm = editProfileModal.querySelector('.modal__form');
const nameInput = editForm.querySelector('#profile-title-input');
const jobInput = editForm.querySelector('#profile-description-input');
const profileName = document.querySelector('#profile-title');
const profileJob = document.querySelector('#profile-description');

// Image Preview Modal
const previewModal = document.querySelector('#preview-image-modal');
const previewImage = previewModal.querySelector('.modal__preview-image');
const previewCaption = previewModal.querySelector('.modal__image-caption');

// ---------- Functions ----------

function handleImageClick(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewCaption.textContent = name;
  openPopup(previewModal);
}

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, handleImageClick);
  return card.generateCard();
}

function openPopup(popup) {
  popup.classList.add('modal_opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove('modal_opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.modal_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// ---------- Form Handling ----------

cardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  };
  const newCard = createCard(cardData);
  cardsContainer.prepend(newCard);
  cardForm.reset();
  cardFormValidator.resetValidation();
  closePopup(addCardModal);
});

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfileModal);
});

// ---------- Event Listeners ----------

addCardButton.addEventListener('click', () => {
  cardForm.reset();
  cardFormValidator.resetValidation();
  openPopup(addCardModal);
});

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editFormValidator.resetValidation();
  openPopup(editProfileModal);
});

// ---------- Form Validation ----------

const cardFormValidator = new FormValidator(validationConfig, cardForm);
const editFormValidator = new FormValidator(validationConfig, editForm);

cardFormValidator.enableValidation();
editFormValidator.enableValidation();

// ---------- Initial Cards ----------

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsContainer.append(cardElement);
});
