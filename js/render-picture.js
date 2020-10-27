'use strict';

(function() {
  // ------------------ клонируем изоражения ---------------
  // шаблон изображений
  var pictureTemplate = document.querySelector('#picture-template')
    .content;
  // где выводим изображения
  var uploadFormPreview = document.querySelector('.container');
  // конкретное изображение
  var linkPicture = pictureTemplate.querySelector('.picture');

  // функция клонирования изображений(шаблона)
  var renderPicture = function(pictureElements) {
    // клонируем наш шаблон
    var pictureElement = pictureTemplate.cloneNode(true);

    // подменяем контент в setup-similar-label из объекта
    pictureElement.querySelector('img').src = pictureElements.url;
    pictureElement.querySelector('.picture-comments').textContent = pictureElements.comments.length;
    // подменяем style с заливкой в wizard-coat из объекта
    pictureElement.querySelector('.picture-likes').textContent = pictureElements.likes;
    // возвращаем глобальную переменную
    return pictureElement;
  };



window.renderPictureActive = function(pictureElements) {
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

    var pictureId = uploadFormPreview.querySelectorAll('.picture');
    galleryOverlayPreview(pictureElements, pictureId);
};

  // находим все изображения для отлова клика
  var successHandler = function(pictureElements) {

    filtersRecommend(pictureElements);
    renderPictureActive(pictureElements);

    var filtersOpen = document.querySelector('.filters');
    filtersOpen.classList.remove('hidden');

  };

  window.load(successHandler);

})();
