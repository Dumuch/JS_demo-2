'use strict';

(function() {

  window.filtersRecommend = function(pictureElements) {
    var pictureElements = pictureElements;
    var pictureElementsLikes = pictureElements.sort(function(left, right) {
      var one = left.comments.length + left.likes;
      var two = right.comments.length + right.likes;

      if (one < two) {
        return 1;
      }
      if (one > two) {
        return -1;
      }
      return 0;
    })
  };

  var successHandler = function(pictureElements) {

    var filtersLikes = function(pictureElements) {
      var pictureElements = pictureElements;
      var pictureElementsLikes = pictureElements.sort(function(left, right) {
        if (left.likes < right.likes) {
          return 1;
        }
        if (left.likes > right.likes) {
          return -1;
        }
        return 0;
      })
    };

     var filtersComments = function(pictureElements) {
      var pictureElements = pictureElements;

      var pictureElementsLikes = pictureElements.sort(function(left, right) {
        if (left.comments.length < right.comments.length) {
          return 1;
        }
        if (left.comments.length > right.comments.length) {
          return -1;
        }
        return 0;
      })
    };

    var filters = function(evt) {

    var linkPicture = document.querySelector('.pictures');
    while (linkPicture.firstChild) {
      linkPicture.removeChild(linkPicture.firstChild);
    };

      var filtersLabel = evt.currentTarget.value;
      if (filtersLabel == 'recommend') {

        filtersRecommend(pictureElements);
        renderPictureActive(pictureElements);

      } else if(filtersLabel == 'popular') {

        filtersLikes(pictureElements);
        renderPictureActive(pictureElements);

      } else if(filtersLabel == 'discussed') {

        filtersComments(pictureElements);
        renderPictureActive(pictureElements);

      } else {
        pictureElements.sort(() => Math.random() - 0.5);
        renderPictureActive(pictureElements);
      }
    };


    var filtersItem = document.querySelector('.filters-item');

    var radioEffect = document.querySelectorAll('.filters-radio');
    for (var i = 0; i < radioEffect.length; i++) {
      radioEffect[i].addEventListener('click', filters);
    };

  };

  window.load(successHandler);
})();
