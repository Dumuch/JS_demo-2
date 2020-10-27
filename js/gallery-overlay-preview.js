'use strict';

(function() {
  window.galleryOverlayPreview = function(pictureElements, pictureId) {


    //  ---------------- показ полного изоражения с комментариями -----------
    // находим форму полного изображения
    var galleryOverlay = document.querySelector('.gallery-overlay');
    // список для комментарий
    var galleryOverlayCommentsList = galleryOverlay.querySelector('.gallery-overlay-comments-list');
    // шаблон вывода комментарий
    var socialCommentText1 = document.querySelector('#social__comment-template').content;
    var uploadOverlay = document.querySelector('.upload-overlay');
    var effectImagePreview = document.querySelector('.effect-image-preview');

    window.closePopup = function() {
      uploadOverlay.classList.add('hidden');
    };

    window.openPopup = function() {
      uploadOverlay.classList.remove('hidden');
    };

    // функция создания полного изображения
    var renderGalleryOverlay = function(pictureElements) {
      // подменяем контент из объекта
      galleryOverlay.querySelector('.gallery-overlay-image').src = pictureElements.url;
      galleryOverlay.querySelector('.likes-count').textContent = pictureElements.likes;
      galleryOverlay.querySelector('.comments-count').textContent = pictureElements.comments.length;
    };




    // функция открытия полного изображения и вывода комментарий
    var openOverlayPreview = function(evt) {
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
        socialCommentElement.querySelector('.social__text').textContent = indexComment.message;
        socialCommentElement.querySelector('.social__picture').src = indexComment.avatar;

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


    // находим все изображения для отлова клика
    // var pictureId = uploadFormPreview.querySelectorAll('.picture');

    // отлавливаем клик на любом изображении
    for (var i = 0; i < pictureId.length; i++) {
      pictureId[i].addEventListener('click', openOverlayPreview);
    };

    //  зыкрываем окно полного изображения
    var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
    galleryOverlayClose.addEventListener('click', function() {
      galleryOverlay.classList.add('hidden');

      // второй способ удаления
      while (galleryOverlayCommentsList.firstChild) {
        galleryOverlayCommentsList.removeChild(galleryOverlayCommentsList.firstChild);
      };
    });

  }

})();
