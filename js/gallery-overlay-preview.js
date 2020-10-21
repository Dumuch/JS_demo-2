'use strict';

(function() {
  var successHandler = function(pictureElements){

  //  ---------------- показ полного изоражения с комментариями -----------
  // находим форму полного изображения
  var galleryOverlay = document.querySelector('.gallery-overlay');
  // список для комментарий
  var galleryOverlayCommentsList = galleryOverlay.querySelector('.gallery-overlay-comments-list');
  // шаблон вывода комментарий
  var socialCommentText1 = document.querySelector('#social__comment-template').content;


  // функция создания полного изображения
  var renderGalleryOverlay = function(pictureElements) {
    // подменяем контент из объекта
    galleryOverlay.querySelector('.gallery-overlay-image').src =  pictureElements.url;
    galleryOverlay.querySelector('.likes-count').textContent = pictureElements.likes;
    galleryOverlay.querySelector('.comments-count').textContent = pictureElements.comments.length;
  };

  var uploadFormPreview = document.querySelector('.container');
  // находим все изображения для отлова клика
  // var pictureId = uploadFormPreview.querySelectorAll('.picture');

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
    console.log(comments2);
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

  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');

  window.closePopup = function() {
    uploadOverlay.classList.add('hidden');
  };

  window.openPopup = function() {
    uploadOverlay.classList.remove('hidden');
  };

  uploadFormCancel.addEventListener('click', function() {
    closePopup();
    effectImagePreview.classList = 'effect-image-preview';
  });

  var form = document.querySelector('#upload-select-image');
  form.addEventListener('submit', function(evt){
    // при помощи formData(конструктор) берем данные и отправляем их
    window.upload(new FormData(form), function(response){
      uploadOverlay.classList.add('hidden');
    });
    evt.preventDefault();
  });

};
  window.load(successHandler);

})();
