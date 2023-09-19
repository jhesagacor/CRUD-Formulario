const URL_API  = 'https://js-6e32d-default-rtdb.firebaseio.com/'
const enviar = document.querySelector('#add-person');
const container = document.querySelector('#list-person');
const listPerson = [];

const renderPersona = (infoPersona, index) => {
    console.log(infoPersona)
    const li = document.createElement('li');
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.style = 'max-width: 540px;'
    card.id = 'card'
    const cardDirection = document.createElement('div');
    cardDirection.className = 'row g-0';
    const cardImage = document.createElement('div');
    cardImage.className = 'col-md-4';
    const img = document.createElement('img');
    img.src = infoPersona.avatar;
    img.className = 'img-fluid rounded-start';
    const cardBodyDirection = document.createElement('div');
    cardBodyDirection.className = 'col-md-8';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body row row-cols-2';
    cardBody.id = 'cardBody';
    const cNombre = document.createElement('div');
    cNombre.className = 'col'
    const pNombre = document.createElement('p');
    pNombre.textContent = 'Nombre'
    const contentNombre = document.createElement('span');
    contentNombre.textContent = infoPersona.name;
    const cApellido = document.createElement('div');
    cApellido.className = 'col'
    const pApellido = document.createElement('p');
    pApellido.textContent = 'Apellido'
    const contentApellido = document.createElement('span');
    contentApellido.textContent = infoPersona.lastName;
    const cFecha = document.createElement('div');
    cFecha.className = 'col'
    const pFecha = document.createElement('p');
    pFecha.textContent = 'Fecha'
    const contentFecha = document.createElement('span');
    contentFecha.textContent = infoPersona.dateBirth;
    const cGenero = document.createElement('div');
    cGenero.className = 'col'
    const pGenero = document.createElement('p');
    pGenero.textContent = 'Genero'
    const contentGenero = document.createElement('span');
    contentGenero.textContent = infoPersona.gender;
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'd-flex justify-content-end';
    // const span = document.createElement('span');
    const buttonEditar = document.createElement('button');
    buttonEditar.className = 'btn btn-primary';
    buttonEditar.textContent = 'Editar'
    buttonEditar.dataset.persona = infoPersona.id;
    const buttonEliminar = document.createElement('button');

    buttonEliminar.className = 'btn btn-primary';
    buttonEliminar.textContent = 'Eliminar';
    buttonEliminar.dataset.persona = infoPersona.id;

    buttonEliminar.addEventListener('click',(event) => {
        const elementToRemove = event.target.dataset.persona;
        deletePerson(elementToRemove)
    });

    buttonEditar.addEventListener('click',(event) => {
        const elementToEdit = event.target.dataset.persona;
        window.location.href = 'http://127.0.0.1:5501/ChallengeFinal/EditInterface/?id=' + elementToEdit;
    });

    li.appendChild(buttonEliminar);
    container.appendChild(li);
    li.appendChild(card);
    card.appendChild(cardDirection);
    cardDirection.appendChild(cardImage);
    cardImage.appendChild(img)
    cardDirection.appendChild(cardBodyDirection);
    cardBodyDirection.appendChild(cardBody);
    cardBodyDirection.appendChild(buttonContainer);
    buttonContainer.appendChild(buttonEditar);
    buttonContainer.appendChild(buttonEliminar);
    cardBody.appendChild(cNombre);
    cNombre.appendChild(pNombre);
    cNombre.appendChild(contentNombre);
    cardBody.appendChild(cApellido);
    cApellido.appendChild(pApellido);
    cApellido.appendChild(contentApellido);
    cardBody.appendChild(cFecha);
    cFecha.appendChild(pFecha);
    cFecha.appendChild(contentFecha);
    cardBody.appendChild(cGenero);
    cGenero.appendChild(pGenero);
    cGenero.appendChild(contentGenero);

};


const renderList = (listToRender) => {
    listToRender.forEach(( persona, index ) => {
        renderPersona(persona, index);
    });
};

const cleanList = () => {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
    };
};

enviar.addEventListener('click', () => {
    const inputName = document.querySelector('#name');
    const inputLastName = document.querySelector('#lastName');
    const inputAvatar = document.querySelector('#avatar');
    const inputDateBirth = document.querySelector('#dateBirth')
    const inputGender = document.querySelector("input[name='gender']:checked");
    const inputCountry = document.querySelector('#select');
    const inputDescripcion = document.querySelector('#descripcion')
    const persona = {
        avatar: inputAvatar.value,
        name: inputName.value,
        lastName: inputLastName.value,
        dateBirth: inputDateBirth.value,
        gender: inputGender.value,
        country: inputCountry.value,
        description: inputDescripcion,
    };
    createPerson(persona);
});

const getInfo = async() => {
    try {
        const url = URL_API + '.json'
        const response = await fetch(url);
        if(response.status !== 201){
            const parsed = await response.json();
            const responseParsed = parserResponseFireBase(parsed);
            cleanList();
            renderList(responseParsed)
        }

    } catch (error) {
        console.error(error, 'xxxx')
    }
};

getInfo()

const createPerson = async (persona) =>{
    const url = URL_API + '.json'
    const create = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(persona),
    });
    if(create.status === 200){
        getInfo();
     }
}

const deletePerson = async (id) => {
    const url = URL_API;
    const deleted = await fetch(URL_API + id + '.json',{
    method: 'DELETE',
    });
    if(deleted.status === 200){
    getInfo();
 }
}

const parserResponseFireBase = (response) => {
    const parsedResponse = []
        for(const key in response ){
            const element = {
                id: key,
                avatar: response[key].avatar,
                lastName: response[key].lastName,
                name: response[key].name,
                country: response[key].country,
                dateBirth: response[key].dateBirth,
                gender: response[key].gender,
            };
            parsedResponse.push(element)
        };
    return parsedResponse;
};