// попап для редактирования профиля
const popup = document.querySelector('.popup');  //попап редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const profileName = document.querySelector('.profile__name'); // редактирование имени
const profileText = document.querySelector('.profile__text'); // редактирование должности
const savePopupButton = popup.querySelector('.popup__button'); // кнопка сохранить
const buttonClosePopup = popup.querySelector('.popup__close-icon'); // кнопка закрытия попапа
const formPopup = popup.querySelector('.popup__form'); // форма попапа
const nameInput = formPopup.querySelector('.name__input');        
const jobInput = formPopup.querySelector('.job__input');

const elements = document.querySelector('.elements__element'); // список для карточек
const templateCard = document.querySelector('#template-cards').content // tamplate обьект

const addCardButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа для добавления карточек
const popupCards = document.querySelector('.popup_card-add'); // попап для загрузки карточек
const closePopupButton = document.querySelector('.popup_card-close');

const popupForm = document.querySelector('#create__card')   
const nameCardInput = document.querySelector('.name__card-input');
const linkCardInput = document.querySelector('.link__input');

const popupImageZoom = document.querySelector('.popup_image-zoom')
const closePopupImage = document.querySelector('.popop__close-zoom_image');

// реализация редактирования попапа

function openPopup(item) {  // функция открытия попапа
  item.classList.add('popup_opened');
}

function closePopup(item) { // функция закрытия попапа
  item.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', function() {
  openPopup(popup);
});

buttonClosePopup.addEventListener('click', function() {
  closePopup(popup)
});


function handleFormSubmit(evt) {      // функция редактирования профиля через попап
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileText.textContent = jobValue;

  closePopup(popup);
}

formPopup.addEventListener('submit', handleFormSubmit)

const initialCards = [                  // массив карточек 
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// реализация загрузки карточек из массива на страницу

function createCard(name, link) {
  const cardElement = templateCard.querySelector('.element').cloneNode(true);
  cardElement.querySelector(".element__title").textContent = name;
  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector('.element__image').alt = name
  cardElement.querySelector('.element__button-like').addEventListener('click', likeCard)
  cardElement.querySelector('.element__button-trash').addEventListener('click', deleteCard)
  cardElement.querySelector('.element__image').addEventListener('click', openPopupCard)
  elements.prepend(cardElement);
}

function renderCard() {  // функция добавления карточек из массива на страницу
  initialCards.forEach(item => createCard(item.name, item.link))
}

// реализация открытия попапа для добавления карточек 

addCardButton.addEventListener('click', function() {
  openPopup(popupCards);
});

closePopupButton.addEventListener('click', function() {
  closePopup(popupCards);
});

// реализация открытия попапа и добавления карточки на страницу

function addCard() {
  popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault()
    
    createCard(nameCardInput.value, linkCardInput.value);
    closePopup(popupCards)
  })
}

// реализация лайка карточки

function likeCard(evt) {
  evt.target.classList.toggle('element__button-like_active')
}

// реализация удаления карточки

function deleteCard(evt) {
  evt.currentTarget.closest('.element').remove();
}

//реализация открытия попапа с изображением

function openPopupCard(evt) {
  document.querySelector('.popup__image').src = evt.currentTarget.closest('.element__image').src;
  document.querySelector('.popup__caption').textContent = evt.currentTarget.closest('.element__image').alt
  openPopup(popupImageZoom)
}

closePopupImage.addEventListener('click', function() {
  closePopup(popupImageZoom);
});




addCard();
renderCard();

