'use strict';


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
};



var comments1 = pictureElements[4];
var comments2 = comments1.comments;
var len = comments2.length;

var galleryOverlayCommentsText = function(pictureElements, indexComment) {
  var socialCommentElement = socialCommentText1.cloneNode(true);
  socialCommentElement.querySelector('.social__text').textContent = indexComment; // возвращаем глобальную переменную

 return socialCommentElement;
};

var fragmentOverlay = document.createDocumentFragment();
for (var i = 0; i < len; i++) {
  var indexComment = comments2[i];
  fragmentOverlay.appendChild(galleryOverlayCommentsText(pictureElements[i], indexComment));
};

galleryOverlayCommentsList.appendChild(fragmentOverlay);
renderGalleryOverlay(pictureElements[4]);
