'use strict';

(function() {
  // адрес, по которому будет обращение
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  // глобальная функция
  window.load = function(onSuccess, onError) {
    // формируется запрос на сервер
    var xhr = new XMLHttpRequest();
    // получаем данные в формате json
    xhr.responseType = 'json';

    // // создаем обработчик на загрузку данных
    // xhr.addEventListener('load', function() {
    //   // как только пошла загрузка, то вызываем функцию
    //   if (xhr.status === 200) {
    //     onSuccess(xhr.response);
    //   } else {
    //     onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
    //   }
    // });
    // xhr.addEventListener('error', function(){
    //   onError('Произошла ошибка соединения');
    // });
    // xhr.addEventListener('timeout', function(){
    //   onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    // });

    xhr.addEventListener('load', function() {
      // как только пошла загрузка, то вызываем функцию
      if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else {
      onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
    }
    });
    // открываем запрос на получение при помощи метода GET на адрес URL
    xhr.open('GET', URL);
    // принимаем данные
    xhr.send();
  };

})();
