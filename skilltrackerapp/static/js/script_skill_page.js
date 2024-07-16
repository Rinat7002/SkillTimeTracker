
const nameSkill = document.getElementsByClassName('input-skill-name')
const nameSkills = document.getElementById('input-skill')
const hoursSkill = document.getElementById('input-hours')
const listElement = document.getElementById('list')
const btnAddSkill = document.getElementById('btn-add')


function render() {
    listElement.innerHTML = ''

    // Render из БД
    fetch("/api/skills",
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => {
        // fetch в случае успешной отправки возвращает Promise, содержащий response объект (ответ на запрос)
        // Возвращаем json-объект из response и получаем данные из поля message
        response.json().then(function(data) {
            // console.log(data)
            if (data.skills.length === 0) {
                listElement.innerHTML = '<p>Добавьте свои навыки</p>'
            }
            else {
                for (let i = 0; i < data.skills.length; i++) {
                    listElement.insertAdjacentHTML('beforeend', getSkillTemplate(data.skills[i]))
                }
            }
        });
    })
    .catch( error => {
        alert(error);
        console.error('error:', error);
    });
}

render()


  
btnAddSkill.onclick = function () {
    // console.log(nameSkills.value)

    if ((nameSkills.value.length === 0) || (hoursSkill.value.length === 0))  {
        return
    }

    const newSkill = {
        name: nameSkills.value,
        hours: hoursSkill.value,
    }

    // Добавление навыка и количество часов в БД
    var formdata = JSON.stringify({ name_skill: newSkill.name, hour_skill: newSkill.hours });

    fetch("/api/skills",
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
            // console.log(data)
            render()
            nameSkills.value = ''
            hoursSkill.value = ''
            // alert(data.message);
        });
    })
    .catch( error => {
        alert(error);
        console.error('error:', error);
    });  
};


// Редактировать навык
function editSkill(button) {
    const listItem = button.closest('li');
    const skillNameSpan = listItem.querySelector('#skill-name');
    const skillHourSpan = listItem.querySelector('#skill-hour');
    const taskIndex = button.getAttribute('data-index');
    const id = taskIndex;
    console.log(id);

    if (button.dataset.editing === "true") {
        // Save changes
        const nameInput = listItem.querySelector('input[name="skill-name"]');
        const hourInput = listItem.querySelector('input[name="skill-hour"]');
        
        // Новое измененное название навыка и количество часов
        const newSkillName = nameInput.value;
        const newSkillHour = hourInput.value;

        // Старое название навыка и количество часов
        const oldSkillName = nameInput.dataset.oldValue;
        const oldSkillHour = hourInput.dataset.oldValue;
        
        // Обновление текстовых элементов новыми значениями
        skillNameSpan.textContent = newSkillName;
        skillHourSpan.textContent = newSkillHour + ' часов';

        // Проверка на изменения и вывод в консоль
        if (oldSkillName !== newSkillName || oldSkillHour !== newSkillHour) {
            var formdata = JSON.stringify({ name_skill: newSkillName, hour_skill: newSkillHour});

            fetch(`/api/skills/${id}`,
                {
                    method: "PUT",
                    body: formdata,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then( response => {
                    // fetch в случае успешной отправки возвращает Promise, содержащий response объект (ответ на запрос)
                    // Возвращаем json-объект из response и получаем данные из поля message
                    response.json().then(function(data) {
                        // console.log(data)
                        render()
                    });
                })
                .catch( error => {
                    alert(error);
                    console.error('error:', error);
                }); 
        } else {
            
        }
        
        // Удаление полей ввода
        nameInput.remove();
        hourInput.remove();
        
        // Обновление текста кнопки и атрибута
        button.textContent = 'Редактировать';
        button.dataset.editing = "false";
    } else {

        // Режим редактирования
        // Старое название навыка и количество часов
        const oldSkillName = skillNameSpan.textContent;
        const oldSkillHour = skillHourSpan.textContent.replace(' часов', '');        
        
        // Создание полей ввода
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'skill-name';
        nameInput.value = oldSkillName;
        nameInput.dataset.oldValue = oldSkillName; // Сохранение старого значения

        const hourInput = document.createElement('input');
        hourInput.type = 'text';
        hourInput.name = 'skill-hour';
        hourInput.value = oldSkillHour;
        hourInput.dataset.oldValue = oldSkillHour; // Сохранение старого значения

        skillNameSpan.textContent = '';
        skillHourSpan.textContent = '';

        skillNameSpan.appendChild(nameInput);
        skillHourSpan.appendChild(hourInput);

        button.textContent = 'Сохранить';
        button.dataset.editing = "true";
    }

    // Fetch с PUT
    // не забыть в routes и dbservice написать

    //если старые данные и новые разные, то fetch
    // иначе return , тк данные не были изменены





}



// Кнопка "Удалить"
listElement.onclick = function(event) {
    if (event.target.dataset.index) {
        const taskIndex = event.target.getAttribute('data-index');
        const id = taskIndex;
        const type = event.target.dataset.type;

        // Удалить навык    
        if (type === 'remove') {
            console.log("remove");
            // console.log(event.target.closest('.list-group-item'));
            var isDelete = confirm(`Вы действительно хотите удалить ?`)

            if (isDelete) {
                // console.log(`Навык был удален.`);
            } else {
                // Если пользователь нажал "Отмена", выйти из функции
                // console.log(`Удаление навыка отменено.`);
                return;
            }  

            fetch(`/api/skills/${id}`,
            {
                method: "DELETE",
                // body: formdata,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then( response => {
                // fetch в случае успешной отправки возвращает Promise, содержащий response объект (ответ на запрос)
                // Возвращаем json-объект из response и получаем данные из поля message
                response.json().then(function(data) {
                    // console.log(data)
                    render()
                });
            })
            .catch( error => {
                alert(error);
                console.error('error:', error);
            });                        
        } 

    }
}



function getSkillTemplate(skill) {
    return `
    <li
        id="list-group-skills"
        class="list-group-item d-flex justify-content-between align-items-center"
    >
        <span id="skill-name" class="skills">${skill.name_skill}</span>
        <span id="skill-hour" class="skills">${skill.hour_skill} часов</span>

        <span>
        <span class="btn edit-btn btn-small btn-warning" data-index="${skill.id}" data-type="edit" onclick="editSkill(this)">Редактировать</span>
        <span class="btn btn-small btn-danger" data-index="${skill.id}" data-type="remove">Удалить</span>
        </span>
        </li>
` 
}


