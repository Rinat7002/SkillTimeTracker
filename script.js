const nameSkill = document.getElementsByClassName('input-skill-name')
const nameSkills = document.getElementById('input-skill')
const hoursSkill = document.getElementById('input-hours')
const listElement = document.getElementById('list')

const btnAddSkill = document.getElementById('btn-add')

const skills = [
    {
    name: 'Программирование', 
    hours: 88
    },
    {
    name: 'Спорт',
    hours: 250
    },
]


function render() {
    listElement.innerHTML = ''
    if (skills.length === 0) {
        listElement.innerHTML = '<p>Добавьте свои навыки</p>'
    }
    for (let i = 0; i < skills.length; i++) {
        listElement.insertAdjacentHTML('beforeend', getSkillTemplate(skills[i], i))
    }
}

render()



btnAddSkill.onclick = function () {
    console.log(nameSkills.value)

    if (nameSkills.value.length === 0) {
        return
    }

    const newSkill = {
        name: nameSkills.value,
        hours: hoursSkill.value,
    }
    skills.push(newSkill)
    render()
    nameSkills.value = ''
    hoursSkill.value = ''
}

listElement.onclick = function(event) {
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index)
        const type = event.target.dataset.type

        if (type === 'remove') {
            // console.log('remove', index)
            deleteState = confirm(`Хотите удалить навык "${skills[index].name}" ?`)
            if (deleteState) {
                skills.splice(index, 1)
            }
            
        }
        render()
    }
}

function getSkillTemplate(skill, index) {
    return `
    <li
        class="list-group-item d-flex justify-content-between align-items-center"
    >
        <span class="skills">${skill.name}</span>
        <span class="skills">${skill.hours} часов</span>

        <span>
        <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
        </span>
        </li>
` 
}