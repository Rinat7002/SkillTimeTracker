/*
Реализация AJAX с помощью асинхронного метода fetch
*/

var sendbtn = document.getElementById("sendbtn");

sendbtn.addEventListener("click", function (e) {
    /* Инструкция preventDefault позволяет переопределить стандартное поведение браузера,
    если ее убрать, то браузер по-умолчанию обновит страницу после отправки данных формы */
    e.preventDefault();

    let fname = document.getElementsByName("fname")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let reqtype = document.getElementsByName("reqtype")[0].value;
    let reqtext = document.getElementsByName("reqtext")[0].value;
    // Преобразуем полученные данные в JSON
    var formdata = JSON.stringify({ firstname: fname, email: email, reqtype: reqtype, reqtext: reqtext});

    // Отправляем запрос через fetch (необходимо выставить соответствующий заголовок (headers)!)
    fetch("/api/contactrequest",
    {
        method: "POST",
        body: formdata,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
        // fetch в случае успешной отправки возвращает Promise, содержащий response объект (ответ на запрос)
        // Возвращаем json-объект из response и получаем данные из поля message
        response.json().then(function(data) {
            console.log(data)
            let statfield = document.getElementById("statusfield");
//            statfield.textContent = data.message;
            //statfield.textContent.bold();
            alert("Ваша заявка отправлена.");
        });
    })
    .catch( error => {
        alert(error);
        console.error('error:', error);
    });

});
