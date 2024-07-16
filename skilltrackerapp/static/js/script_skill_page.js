
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
            console.log(data)
            if (data.skills.length === 0) {
                listElement.innerHTML = '<p>Добавьте свои навыки</p>'
            }
            else {
                for (let i = 0; i < data.skills.length; i++) {
                    listElement.insertAdjacentHTML('beforeend', getSkillTemplate(data.skills[i], i))
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
    console.log(nameSkills.value)

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
            console.log(data)
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





listElement.onclick = function(event) {
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index)
        const type = event.target.dataset.type
        console.log(index);
        // Удалить навык из списка
        if (type === 'remove') {

            console.log(event.target.closest('.list-group-item'));

            const id = "3";

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
                    console.log(data)

                    // deleteState = confirm(`Хотите удалить навык "${data.skills[index].name}" ?`)

                    // if (deleteState) {
                    //     data.skills.splice(index, 1)
                    // }
                    render()
                    // alert(data.message);
                });
            })
            .catch( error => {
                alert(error);
                console.error('error:', error);
            });            



            
            
        }
        // render()
    }
}

function getSkillTemplate(skill, index) {
    return `
    <li
        class="list-group-item d-flex justify-content-between align-items-center"
    >
        <span class="skills">${skill.name_skill}</span>
        <span class="skills">${skill.hour_skill} часов</span>

        <span>
        <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
        </span>
        </li>
` 
}

