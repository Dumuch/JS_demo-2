// document.querySelector('.gallery-overlay').classList.remove('hidden');

var pictureTemplate = document.querySelector('#picture-template')
  .content;

var uploadFormPreview = document.querySelector('.container');

var linkPicture = pictureTemplate.querySelector('.picture');

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
  linkPicture.id = 'picture-' + i;

  fragment.appendChild(renderPicture(pictureElements[i]));
};

uploadFormPreview.appendChild(fragment);

var pictureId = uploadFormPreview.querySelector('.picture');
console.log(uploadFormPreview);
console.log(pictureId);
pictureId.addEventListener('click', function() {
  galleryOverlay.classList.remove('hidden');

});
