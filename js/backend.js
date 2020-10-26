'use strict';
(function() {
  // адрес, по которому будет обращение
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/kekstagram';
  // var URL_UPLOAD ='https://echo.htmlacademy.ru';

  // глобальная функция
  window.load = function(onLoad, onError) {
    // формируется запрос на сервер
    var xhr = new XMLHttpRequest();
    // получаем данные в формате json
    xhr.responseType = 'json';

    // создаем обработчик на загрузку данных
    xhr.addEventListener('load', function() {
      // как только пошла загрузка, то вызываем функцию
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });
    // открываем запрос на получение при помощи метода GET на адрес URL
    xhr.open('GET', URL_LOAD);
    // принимаем данные
    xhr.send();
  };


  window.upload = function(data, onLoad, onError) {
  // формируется запрос на сервер
  var xhr = new XMLHttpRequest();
  // получаем данные в формате json
  xhr.responseType = 'json';
  // создаем обработчик на загрузку данных
  // открываем запрос на отправку при помощи метода POST на адрес URL
  xhr.open('POST', URL_UPLOAD);
  xhr.addEventListener('load', function() {
    // как только пошла загрузка, то вызываем функцию
    if (xhr.status === 200) {
      onLoad(xhr.response);
    } else {
      onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
    }
  });
  // отправляем данные
  xhr.send(data);
};

})();
