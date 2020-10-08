// шаблон изображений
var pictureTemplate = document.querySelector('#picture-template')
  .content;
// где выводим изображения
var uploadFormPreview = document.querySelector('.container');
// конкретное изображение
var linkPicture = pictureTemplate.querySelector('.picture');


// массив объектов
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


// функция клонирования изображений(шаблона)
var renderPicture = function(pictureElements) {
  // клонируем наш шаблон
  var pictureElement = pictureTemplate.cloneNode(true);

  // подменяем контент в setup-similar-label из объекта
  pictureElement.querySelector('img').src = 'img/' + pictureElements.url;
  pictureElement.querySelector('.picture-comments').textContent = pictureElements.comments.length;
  // подменяем style с заливкой в wizard-coat из объекта
  pictureElement.querySelector('.picture-likes').textContent = pictureElements.likes;
  // возвращаем глобальную переменную
  return pictureElement;
}

// создаем в памяти fragment
var fragment = document.createDocumentFragment();
// запускаем цикл
// цикл происходит столько раз, сколько объектов в массиве
for (var i = 0; i < pictureElements.length; i++) {
  // добавляем к каждому изображению id
  linkPicture.id = i;
  // в fragment вставляем шаблоны по порядку в конец
  fragment.appendChild(renderPicture(pictureElements[i]));
};
// выводим в контейнере фрагменты по порядку
uploadFormPreview.appendChild(fragment);



// находим форму полного изображения
var galleryOverlay = document.querySelector('.gallery-overlay');
// список для комментарий
var galleryOverlayCommentsList = galleryOverlay.querySelector('.gallery-overlay-comments-list');
// шаблон вывода комментарий
var socialCommentText1 = document.querySelector('.social__comment').content;


// функция создания полного изображения
var renderGalleryOverlay = function(pictureElements) {
  // подменяем контент из объекта
  galleryOverlay.querySelector('.gallery-overlay-image').src = 'img/' + pictureElements.url;
  galleryOverlay.querySelector('.likes-count').textContent = pictureElements.likes;
  galleryOverlay.querySelector('.comments-count').textContent = pictureElements.comments.length;
};


// находим все изображения для отлова клика
var pictureId = uploadFormPreview.querySelectorAll('.picture');

// функция открытия полного изображения и вывода комментарий
var topTop = function(evt) {
  // открываем полное изображение
  galleryOverlay.classList.remove('hidden');
  // находим id открытого изображения
  var pictureIdIndex = evt.currentTarget.id;
  // переменная, которая содержит массив комментарий для каждого изображения
  var comments2 = pictureElements[pictureIdIndex].comments;
  // переменная, которая подсчитывает кол-во комментарий
  var len = comments2.length;


  // функция вывода коментария
  var galleryOverlayCommentsText = function(pictureElements, indexComment) {
    // клонируем наш шаблон комментарий
    var socialCommentElement = socialCommentText1.cloneNode(true);
    // вставляем комментарии
    socialCommentElement.querySelector('.social__text').textContent = indexComment;

    // возвращаем глобальную переменную
    // возвращаем комментарии
    return socialCommentElement;
  };

  // создаем фрагмент
  var fragmentOverlay = document.createDocumentFragment();

  // запускаем цикл вывода комментариев
  for (var i = 0; i < len; i++) {
    // в переменную записываем каждый отдельный комменатрий
    var indexComment = comments2[i];
    // передаем в функцию два параметра - элемент, в который записываем комментарий и номер комментария
    fragmentOverlay.appendChild(galleryOverlayCommentsText(pictureElements[i], indexComment));

  };

  // вставляем комментарии в list
  galleryOverlayCommentsList.appendChild(fragmentOverlay);

  // запускаем функцию полного изображения по id
  renderGalleryOverlay(pictureElements[pictureIdIndex]);
};

// отлавливаем клик на любом изображении
for (var i = 0; i < pictureId.length; i++) {
  pictureId[i].addEventListener('click', topTop);
};

//  зыкрываем окно полного изображения
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
galleryOverlayClose.addEventListener('click', function() {
  galleryOverlay.classList.add('hidden');
});
