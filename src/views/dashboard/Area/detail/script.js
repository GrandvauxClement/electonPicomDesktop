const modalDeleteStop = document.getElementById("stopDeleteModal");
const buttonDeleteStop = document.getElementById("deleteStop")
const buttonUpdateArea= document.getElementById("updateArea")
const buttonAddStop = document.getElementById("addStop")
const listStop = document.getElementById("listStop")
// Form update area
const updateAreaBtn = document.getElementById("updateArea");
const inputNameArea = document.getElementById("inputNameArea");
const inputPriceArea = document.getElementById("inputPriceArea")
// From add/update stop
const inputAdress = document.getElementById("inputAdressStop");
const adressListDisplayChoice = document.getElementById("adressListDisplay");
const inputNameStop = document.getElementById("inputNameStop");
const inputAdressIp = document.getElementById("inputAdressIPStop");

let areaSelected = null;

const createLiListStop = (data) => {
    const li = document.createElement("li");
    const text = document.createElement("span")
    text.innerText = `${data.name}`;
    const btnDelete = document.createElement('a');
    btnDelete.setAttribute("data-toggle", "modal");
    btnDelete.setAttribute("data-target", "#stopDeleteModal")
    btnDelete.href = "#"
    btnDelete.className = "btn btn-danger btn-icon-split"
    btnDelete.innerHTML = ` <span class="icon text-white-50">
                <i class="fas fa-trash"></i>
                <span class="text">Supprimer l'arrêt</span>
            </span>`
    btnDelete.addEventListener('click', (e) => {
        modalDeleteStop.dataset.id = data.id
    })

    li.append(text, btnDelete)
    li.className = 'list-group-item d-flex justify-content-between'
    listStop.appendChild(li)
}

const getIdParamsOnRoad = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id')
}

addEventListener('load',async  () =>{

    const response = await window.electronAPI.getAreaById({id: getIdParamsOnRoad()});
    areaSelected = response
    const titlePage = document.getElementById('titlePage');
    titlePage.innerText = `Détail de la zone ${response.name}`
    console.log("area data --> ", response)
    inputNameArea.value = response.name;
    inputPriceArea.value = response.price
    response.stopList.forEach((stop) => {

        createLiListStop(stop)
    })
});

buttonDeleteStop.addEventListener('click', async () => {

    await window.electronAPI.deleteStopById({id: modalDeleteStop.dataset.id});
    window.location.reload()
})

buttonAddStop.addEventListener('click', async () => {
    const newStop = {
        "name": inputNameStop.value,
        "latitude": inputAdress.dataset.latitude,
        "longitude": inputAdress.dataset.longitude,
        "area": {id: getIdParamsOnRoad()},
        "adressIp": inputAdressIp.value
    };
    const res = await window.electronAPI.addStop(newStop)

    createLiListStop(res)
    document.getElementById("closeModalStop").click()
    areaSelected.stopList.push(res)
})

inputAdress.addEventListener('input',  (e) => {
    fetch(encodeURI(`https://api-adresse.data.gouv.fr/search/?q=${inputAdress.value}&limit=10`))
        .then((res) => {
            if (res.status === 200) {
                res.json().then((json) => {
                    adressListDisplayChoice.innerHTML = '';
                    json.features.forEach((data) => {
                        const li = document.createElement("a");
                        li.className = "list-group-item list-group-item-action"
                        li.href = "#"
                        li.dataset.longitude = data.geometry.coordinates[0];
                        li.dataset.latitude = data.geometry.coordinates[1];
                        li.innerText = data.properties.label;
                        li.addEventListener('click', (e) => {
                            inputAdress.value = data.properties.label;
                            inputAdress.dataset.longitude = data.geometry.coordinates[0];
                            inputAdress.dataset.latitude = data.geometry.coordinates[1];
                            adressListDisplayChoice.innerHTML = '';
                            e.stopPropagation();
                        })
                        adressListDisplayChoice.appendChild(li);
                    })
                })
            }
        })
})

updateAreaBtn.addEventListener('click', async () => {
    areaSelected.name = inputNameArea.value;
    areaSelected.price = inputPriceArea.value
    const res = await window.electronAPI.updateArea(areaSelected)
    console.log("UPDATE DONE --> res")
})
