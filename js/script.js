// document.querySelector('.gallery-overlay').classList.remove('hidden');

var pictureTemplate = document.querySelector('#picture-template')
    .content;

var uploadFormPreview = document.querySelector('.container');

var pictureElements = ['foto-1.jpg', 'foto-2.jpg', 'foto-3.jpg', 'foto-4.jpg'];



// запускаем цикл
for (var i = 0; i < pictureElements.length; i++) {
  // клонируем наш шаблон
  var pictureElement = pictureTemplate.cloneNode(true);
// подменяем контент в setup-similar-label из массива
  pictureElement.querySelector('img').src = 'img/' + pictureElements[i];

//   wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
// добавляем шаблон в конец similarListElement
  uploadFormPreview.appendChild(pictureElement);
}
