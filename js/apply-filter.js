'use strict';

(function() {
  // ------------- применение фильтров --------------
  var uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', function() {
    openPopup();
  });

  // ширина блока
  var widthUploadEffectLevelLine = 465;
  // стандартное число для пропорций
  var percentagesForProportion = 100;
  var maxLeft = 460;
  var minLeft = 0;

  var uploadFormPreview = document.querySelector('.upload-form-preview');
  var effectImagePreview = document.querySelector('.effect-image-preview');

  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadEffectLevelPin = uploadEffectControls.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = uploadEffectControls.querySelector('.upload-effect-level-val');
  var positionPin;

  var dragged = false;

var trackingPin = function(shift) {
  if(dragged === false) {
    positionPin = shift;
  } else {
    // добавляем стили смещения к текущим значениям
    positionPin = uploadEffectLevelPin.offsetLeft - shift.x;
  }
    if (positionPin >= maxLeft) {
      uploadEffectLevelPin.style.left = maxLeft + 'px';
      uploadEffectLevelVal.style.width = maxLeft + 'px';
    } else if (positionPin <= minLeft) {
      uploadEffectLevelPin.style.left = minLeft + 'px';
      uploadEffectLevelVal.style.width = minLeft + 'px';

    } else {
      uploadEffectLevelPin.style.left = positionPin + 'px';
      uploadEffectLevelVal.style.width = positionPin + 'px';
    }
  };

  var onMouseDown = function(evt) {
    dragged = true;

    // отмена действий по умолчанию
    evt.preventDefault();
    // запоминаем начальные координаты курсора
    var startCoords = {
      x: evt.clientX
    };

    //  0 px 460px
    // считываем координаты курсора
    var onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      // находим разницу между стартовыми координатами и текущим положением курсора
       var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      // перезаписываем объект с текущими координатами
      startCoords = {
        x: moveEvt.clientX
      };

      trackingPin(shift);
    };

    var onMouseUp = function(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      dragged = false;
    };

    // обработчик завершения перетаскивания нужно вешать на документ
    document.addEventListener('mousemove', onMouseMove);
    // обработчик самого перетаскивания
    document.addEventListener('mouseup', onMouseUp);
  };

  var applyEffectVar = function (positionPin, max, filter, end) {
    var effectVar = (positionPin * percentagesForProportion) / widthUploadEffectLevelLine;
    effectVar = (max * effectVar) / percentagesForProportion;
    // меняем фильтр
    effectImagePreview.style.filter = filter + '(' + effectVar + end;
  };

  // функция изменения фильтра
  // принимаем параметры
  var filterFunction = function(max, filter, end) {
    uploadEffectLevel.removeEventListener('mousedown', filterFunctionNone);

    uploadEffectLevel.addEventListener('mousedown', function(evt) {
      positionPin = evt.clientX - 395;
      trackingPin(positionPin);
      applyEffectVar(positionPin, max, filter, end);
    });

    uploadEffectLevelPin.style.left = maxLeft + 'px';
    uploadEffectLevelVal.style.width = maxLeft + 'px';

    uploadEffectLevelPin.addEventListener('mousedown', onMouseDown);
    // создаем событие по mousemove
    document.addEventListener("mousemove", function() {
      // находим значение для фильтра
      if (dragged) {
        applyEffectVar(positionPin, max, filter, end);
      };
    });
  };

  // функция отмены отслеживания
  var filterFunctionNone = function() {
    uploadEffectLevelPin.style.left = minLeft + 'px';
    uploadEffectLevelVal.style.width = minLeft + 'px';
    effectImagePreview.style.filter = 'none';
  };

  var onMouseDownpositionPinNone = function() {
    uploadEffectLevelPin.style.left = minLeft + 'px';
    uploadEffectLevelVal.style.width = minLeft + 'px';
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
      uploadEffectLevelPin.removeEventListener('mousedown', onMouseDown);
      uploadEffectLevel.addEventListener('mousedown', filterFunctionNone);
    }
  };

  var inputEffect = uploadEffectControls.querySelectorAll('input');
  // отлавливаем клик на любом изображении
  for (var i = 0; i < inputEffect.length; i++) {
    inputEffect[i].addEventListener('click', uploadEffect);
  };

})();
