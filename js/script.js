// document.querySelector('.gallery-overlay').classList.remove('hidden');

var pictureTemplate = document.querySelector('#picture-template')
  .content;

var uploadFormPreview = document.querySelector('.container');

// var pictureElements = ['foto-1.jpg', 'foto-2.jpg', 'foto-3.jpg', 'foto-4.jpg'];



// запускаем цикл
// for (var i = 0; i < pictureElements.length; i++) {
//   // клонируем наш шаблон
//   var pictureElement = pictureTemplate.cloneNode(true);
// // подменяем контент в setup-similar-label из массива
//   pictureElement.querySelector('img').src = 'img/' + pictureElements[i];
//
// //   wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
// // добавляем шаблон в конец similarListElement
//   uploadFormPreview.appendChild(pictureElement);
// }


var pictureElements = [{
    url: 'foto-1.jpg',
    likes: 100,
    comments: ['Хорошо!', 'Плохо', 'Всё отлично!', 'Всё отлично!'],
    description: 'Тестим новую камеру!'
  },
  {
    url: 'foto-2.jpg',
    likes: 150,
    comments: ['Хорошо!', 'Плохо'],
    description: 'Докатились!'
  },
  {
    url: 'foto-3.jpg',
    likes: 60,
    comments: ['Хорошо!', 'Плохо', 'Отстой'],
    description: 'Могло быть и лучше!'
  },
  {
    url: 'foto-4.jpg',
    likes: 10,
    comments: ['Хорошо!', 'Да вы просто молодцы', 'Да вы просто молодцы', 'Да вы просто молодцы', 'Плохо'],
    description: 'Немного красивых видов!'
  },
  {
    url: 'foto-5.jpg',
    likes: 123,
    comments: ['Ужас как ужас', 'Хорошо!', 'Плохо'],
    description: 'Мало кто поймет!'
  }
];


// создаем функцию, в которую будем передавать значение из цикла
var renderPicture = function(pictureElements) {
  // клонируем наш шаблон
  var pictureElement = pictureTemplate.cloneNode(true);
  // подменяем контент в setup-similar-label из объекта
  pictureElement.querySelector('img').src = 'img/' + pictureElements.url;
  pictureElement.querySelector('.picture-comments').textContent = pictureElements.comments.length;
  // подменяем style с заливкой в wizard-coat из объекта
  pictureElement.querySelector('.picture-likes').textContent = pictureElements.likes; // возвращаем глобальную переменную
  return pictureElement;
}

// создаем в памяти fragment
var fragment = document.createDocumentFragment();
// запускаем цикл
for (var i = 0; i < pictureElements.length; i++) {
  // в fragment вставляем шаблоны
  fragment.appendChild(renderPicture(pictureElements[i]));
};

uploadFormPreview.appendChild(fragment);





var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');

var likesCount = galleryOverlay.querySelector('.likes-count');
var commentsCount = galleryOverlay.querySelector('.comments-count');

var galleryOverlayCommentsList = galleryOverlay.querySelector('.gallery-overlay-comments-list');
var socialCommentText1 = document.querySelector('.social__comment').content;


var renderGalleryOverlay = function(pictureElements) {
  // клонируем наш шаблон
  // подменяем контент в setup-similar-label из объекта
  galleryOverlayImage.src = 'img/' + pictureElements.url;
  likesCount.textContent = pictureElements.likes;
  commentsCount.textContent = pictureElements.comments.length;
  // подменяем style с заливкой в wizard-coat из объекта
};


var comments1 = pictureElements[4];
var comments2 = comments1.comments;
var len = comments2.length;

var galleryOverlayCommentsText = function(pictureElements) {
  var socialCommentElement = socialCommentText1.cloneNode(true);
  socialCommentElement.querySelector('.social__text').textContent = comments1.comments; // возвращаем глобальную переменную

 return socialCommentElement;
};

var fragmentOverlay = document.createDocumentFragment();
for (var i = 0; i < len; i++) {
  fragmentOverlay.appendChild(galleryOverlayCommentsText(pictureElements[i]));
};

galleryOverlayCommentsList.appendChild(fragmentOverlay);
renderGalleryOverlay(pictureElements[4]);
