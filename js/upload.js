'use strict';

(function() {
  // адрес, по которому будет обращение
  var URL = 'https://javascript.pages.academy/kekstagram';
  // глобальная функция
  // функция принимает данные data и функцию onSuccess
  window.upload = function(data, onSuccess) {

    // формируется запрос на сервер
    var xhr = new XMLHttpRequest();
    // получаем данные в формате json
    xhr.responseType = 'json';
    // создаем обработчик на загрузку данных
    xhr.addEventListener('load', function() {
      // как только пошла загрузка, то вызываем функцию
      onSuccess(xhr.response);
    });
    // открываем запрос на отправку при помощи метода POST на адрес URL
    xhr.open('POST', URL);
    // отправляем данные
    xhr.send(data);
  };
})();
