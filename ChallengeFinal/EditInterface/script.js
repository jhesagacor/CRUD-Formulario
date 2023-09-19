const URL_API  = 'https://js-6e32d-default-rtdb.firebaseio.com/'
const search = window.location.search;
const url = new URLSearchParams(search);
const ID_PERSONA = url.get('id');


const guardar = document.querySelector('#add-person');
const inputName = document.querySelector('#name');
const inputLastName = document.querySelector('#lastName');
const inputAvatar = document.querySelector('#avatar');
const inputDateBirth = document.querySelector('#dateBirth')
const inputGender = document.querySelector("input[name='gender']:checked");
const inputCountry = document.querySelector('#select');
const inputDescripcion = document.querySelector('#descripcion')

const updatePerson = async () => {
    const url = URL_API + ID_PERSONA + '.json';
    const persona = {
        avatar: inputAvatar.value,
        name: inputName.value,
        lastName: inputLastName.value,
        dateBirth: inputDateBirth.value,
        gender: inputGender.value,
        country: inputCountry.value,
        description: inputDescripcion,
    }
    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(persona)
    });
    if(response.status === 200){
        window.location.href = 'http://127.0.0.1:5501/ChallengeFinal/Main/'
    }
}

guardar.addEventListener('click', ()=>{
    updatePerson()
});



const getInfoById = async () => {
    const url = URL_API + ID_PERSONA + '.json'
    console.log(url)
    const info = await fetch(url);
    const parsed = await info.json()
    console.log(parsed);
    inputAvatar.value = parsed.avatar;
    inputName.value = parsed.name;
    inputLastName.value = parsed.lastName;
    inputDateBirth.value = parsed.dateBirth;
    inputGender.value = parsed.gender;
    inputCountry.value = parsed.country;
    inputDescripcion.value = parsed.description;
};

getInfoById()