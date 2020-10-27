'use strict';

(function() {
  // ------------- применение фильтров --------------
  var uploadFile = document.querySelector('.upload-image input[type=file]');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var effectImagePreview = document.querySelector('.effect-image-preview');

// открываем окно настройки фильтров при загрузке изображений
  uploadFile.addEventListener('change', function() {
    // нужна одна картинка
    var file = uploadFile.files[0];
    // проверяем картинку на расширение
    var fileName = file.name.toLowerCase();
    // some возращает true или false
    var matches = FILE_TYPES.some(function(it){
      return fileName.endsWith(it);
    });

    if (matches) {
      // создаем объект при помощи конструктора
      var reader = new FileReader();
      // как только прочитаем картинку, то src картинки поменяется
      reader.addEventListener('load', function(){
        effectImagePreview.src = reader.result;
      });
      // читаем при помощи этого метода
      reader.readAsDataURL(file);
      openPopup();
    }
  });


  // ширина блока
  var widthUploadEffectLevelLine = 465;
  // стандартное число для пропорций
  var percentagesForProportion = 100;
  // конечное значение для фильтра
  var maxLeft = 460;
  // начальное значение для фильтра
  var minLeft = 0;

  var uploadFormPreview = document.querySelector('.upload-form-preview');

  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadEffectLevelLine = uploadEffectLevel.querySelector('.upload-effect-level-line');
  var uploadEffectLevelPin = uploadEffectControls.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = uploadEffectControls.querySelector('.upload-effect-level-val');
  var positionPin;
  var dragged = false;

// находим положение пина
var trackingPin = function(shift) {
  // если у нас не двигался пин и не вызывалась функция onMouseMove
  // тогда мы заносим данные из другой функции
  if(dragged === false) {
    positionPin = shift;
  } else {
    // добавляем стили смещения к текущим значениям
    positionPin = uploadEffectLevelPin.offsetLeft - shift.x;
  }
  // устанавливаем рамки, в которых мы можем двигать pin
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
// функция при клике на мышь
  var onMouseDown = function(evt) {
    dragged = true;

    // отмена действий по умолчанию
    evt.preventDefault();
    // запоминаем начальные координаты курсора
    var startCoords = {
      x: evt.clientX
    };
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
      // если мы двигали мышь, то срабатывает эта функция с shift
      trackingPin(shift);
    };
    // когда отпускаем мышь, то отключаем отслеживание по клику
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

// применяем фильтры
// для пропорций нам нужны позиция пина, максимальное значение, какой фильтр
// и в каких значениях записывать данные
  var applyEffectVar = function (positionPin, max, filter, end) {
    // при помощи пропорции вычисляем фильтр
    var effectVar = (positionPin * percentagesForProportion) / widthUploadEffectLevelLine;
    effectVar = (max * effectVar) / percentagesForProportion;
    // меняем фильтр
    effectImagePreview.style.filter = filter + '(' + effectVar + end;
  };

  // функция изменения фильтра
  // принимаем параметры
  var filterFunction = function(max, filter, end) {
    // как только мы выбрали фильтр, то отключается отслеживание mousedown на обнуление
    uploadEffectLevel.removeEventListener('mousedown', filterFunctionNone);
    // включается функция отслеживания клика на полосу применения фильтра
    uploadEffectLevel.addEventListener('mousedown', function(evt) {
      evt.preventDefault();
      // находим координату по x для полосы
      var uploadEffectLevelLineX = uploadEffectLevelLine.getBoundingClientRect().x;
      // определяем позицию пина
      // из текущего положения клика вычитаем координату по x
      positionPin = evt.clientX - uploadEffectLevelLineX;
      // эта разница отправляется в функцию положения пина
      trackingPin(positionPin);
      // эти же данные отправляются в функцию применения фильтра
      applyEffectVar(positionPin, max, filter, end);
    });
    // при клике на фильтр значения становятся по дефолту на max
    uploadEffectLevelPin.style.left = maxLeft + 'px';
    uploadEffectLevelVal.style.width = maxLeft + 'px';
    // создается отслеживание нажатого pin
    uploadEffectLevelPin.addEventListener('mousedown', onMouseDown);
    // создаем событие по mousemove, что бы двигать вне pin
    document.addEventListener("mousemove", function() {
      // находим значение для фильтра
      // если было движение, то dragged становится true
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
      filterFunctionNone();
      uploadEffectLevelPin.removeEventListener('mousedown', onMouseDown);
      uploadEffectLevel.addEventListener('mousedown', filterFunctionNone);
    }
  };

  var inputEffect = uploadEffectControls.querySelectorAll('input');
  // отлавливаем клик на любом фильтре
  for (var i = 0; i < inputEffect.length; i++) {
    inputEffect[i].addEventListener('click', uploadEffect);
  };


  var form = document.querySelector('#upload-select-image');
  var uploadEffectNone = uploadEffectControls.querySelector('#upload-effect-none');

  form.addEventListener('submit', function(evt){
    // при помощи formData(конструктор) берем данные и отправляем их
    // закрываем окно
    closePopup();
    window.upload(new FormData(form), function(response){
      // сбрасываем фильтры
      filterFunctionNone();
      // сбрасываем выбор radio
      uploadEffectNone.checked = true;
    });
    evt.preventDefault();
  });

})();
