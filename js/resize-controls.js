'use strict';
(function() {
var uploadResizeControlsButtonDec = document.querySelector('.upload-resize-controls-button-dec');
var uploadResizeControlsButtonInc = document.querySelector('.upload-resize-controls-button-inc');
var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');
var effectImagePreview = document.querySelector('.effect-image-preview');
var resize = 0;

var uploadResizeMax = function(){
  if (resize != 9) {
    resize ++;
    effectImagePreview.style.transform = 'scale(1.' +  resize + ')';
  }
  var resizePercent  = Math.round(resize*100/9);
  uploadResizeControlsValue.value = resizePercent + '%';
};

var uploadResizeMin = function(){
  if (resize != 0) {
    resize --;
    effectImagePreview.style.transform = 'scale(1.' +  resize + ')';
  }
  var resizePercent  = Math.round((resize*100)/9);
  uploadResizeControlsValue.value = resizePercent + '%';
};

uploadResizeControlsButtonInc.addEventListener('click', uploadResizeMax)
uploadResizeControlsButtonDec.addEventListener('click', uploadResizeMin)

})();
