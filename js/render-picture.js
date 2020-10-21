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


  // массив объектов
  // window.pictureElements = [{
  //     url: 'foto-1.jpg',
  //     likes: 100,
  // comments: [
    //   {
    //     "avatar": "img/avatar-6.svg",
    //     "message": "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.",
    //     "name": "Степан"
    //   },
    //   {
    //     "avatar": "img/avatar-1.svg",
    //     "message": "Непонятен один момент: как так-то?!",
    //     "name": "Николай"
    //   }
    // ],
        //     description: 'Тестим новую камеру!'
  //   },
  //   {
  //     url: 'foto-2.jpg',
  //     likes: 150,
  //     comments: ['Хорошо!', 'Плохо'],
  //     description: 'Докатились!'
  //   },
  //   {
  //     url: 'foto-3.jpg',
  //     likes: 60,
  //     comments: ['Хорошо!', 'Плохо', 'Отстой'],
  //     description: 'Могло быть и лучше!'
  //   },
  //   {
  //     url: 'foto-4.jpg',
  //     likes: 10,
  //     comments: ['Хорошо!', 'Да вы просто молодцы', 'Да вы просто молодцы', 'Да вы просто молодцы', 'Плохо'],
  //     description: 'Немного красивых видов!'
  //   },
  //   {
  //     url: 'foto-5.jpg',
  //     likes: 123,
  //     comments: ['Ужас как ужас', 'Хорошо!', 'Плохо'],
  //     description: 'Мало кто поймет!'
  //   }
  // ];


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


  var successHandler = function(pictureElements){
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
};

  window.load(successHandler);



//   // var testPicture = document.querySelectorAll('img');
  // var testPicture = window.load();

})();
