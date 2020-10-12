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
  linkPicture.id = 'picture-' + i;
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
var socialCommentText1 = document.querySelector('#social__comment-template').content;


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
  var pictureIdIndex = pictureIdIndex.split("-")[1];
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

  // второй способ удаления
  while (galleryOverlayCommentsList.firstChild) {
    galleryOverlayCommentsList.removeChild(galleryOverlayCommentsList.firstChild);
  };

  // находим все li, которые создали
  // var liList = galleryOverlayCommentsList.querySelectorAll('.social__comment');
  // // перебираем каждый элемент и удаляем его
  // for(var i=0; i< liList.length; i++) {
  //   liList[i].remove();
  // };
});


var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');

var closePopup = function() {
  uploadOverlay.classList.add('hidden');
};

var openPopup = function() {
  uploadOverlay.classList.remove('hidden');
};

uploadFormCancel.addEventListener('click', function() {
  closePopup();
  effectImagePreview.classList = 'effect-image-preview';
});

var uploadFile = document.querySelector('#upload-file');

uploadFile.addEventListener('change', function() {
  openPopup();
});
// дистанция от окна браузера до левого угла блока
var distanceLeftToUploadEffectLevelLine = 385;
// дистанция от окна браузера до правого угла блока
var distanceRightToUploadEffectLevelLine = 858;
// ширина блока
var withUploadEffectLevelLine = distanceRightToUploadEffectLevelLine - distanceLeftToUploadEffectLevelLine;
// стандарнтое число для пропорций
var percentagesForProportion = 100;

var uploadFormPreview = document.querySelector('.upload-form-preview');
var effectImagePreview = document.querySelector('.effect-image-preview');

var uploadEffectControls = document.querySelector('.upload-effect-controls');
var uploadEffectLevelPin = uploadEffectControls.querySelector('.upload-effect-level-pin');

// функция изменения фильтра
// принимаем параметры
var filterFunction = function(max, filter, end){
  // создаем событие по mouseup
  uploadEffectLevelPin.addEventListener("mouseup", function(evt) {
    // находим координату мыши по x
    var rect = evt.x;
    // находим значение для фильтра
    var effectVar = ((rect - distanceLeftToUploadEffectLevelLine) * percentagesForProportion) / withUploadEffectLevelLine;
    effectVar = (max * effectVar) / percentagesForProportion;
    console.log(effectVar);
    // меняем фильтр
    effectImagePreview.style.filter = filter + '(' + effectVar + end;
  });
};

// функция отмены отслеживания
var filterFunctionNone = function(){
  uploadEffectLevelPin.addEventListener("click", function() {
  uploadEffectLevelPin.addEventListener("mouseup", function() {
    effectImagePreview.style.filter = 'none';
  });
};
// запускаем функцию по изменению фильтров
var uploadEffect = function(evt) {
  // находим значение value
  var effectLabel = evt.currentTarget.value;
  // проверяем значение value с нужным фильтром
  if (effectLabel == 'chrome') {
// применяем исходный фильтр
    effectImagePreview.style.filter = 'grayscale(1)';
    // задаем значения для функции по изменению фильтра
    var max = 1;
    var filter = 'grayscale';
    var end = ')';
    // запуск функции изменения фильтра
    filterFunction(max, filter, end);

  } else if (effectLabel == 'sepia') {
    effectImagePreview.style.filter = 'sepia(1)';

    var max = 1;
    var filter = 'sepia';
    var end = ')';
    filterFunction(max, filter, end);

  } else if (effectLabel == 'marvin') {
    effectImagePreview.style.filter = 'invert(100%)';

    var max = 100;
    var filter = 'invert';
    var end = '%)';
    filterFunction(max, filter, end);

  } else if (effectLabel == 'phobos') {
    effectImagePreview.style.filter = 'blur(5px)';

    var max = 5;
    var filter = 'blur';
    var end = 'px)';
    filterFunction(max, filter, end);

  } else if (effectLabel == 'heat') {
    effectImagePreview.style.filter = 'brightness(3)';

    var max = 3;
    var filter = 'brightness';
    var end = ')';
    filterFunction(max, filter, end);

  } else {
    effectImagePreview.style.filter = 'none';
    filterFunctionNone();

  }
};


var inputEffect = uploadEffectControls.querySelectorAll('input');
// отлавливаем клик на любом изображении
for (var i = 0; i < inputEffect.length; i++) {
  inputEffect[i].addEventListener('click', uploadEffect);
};
