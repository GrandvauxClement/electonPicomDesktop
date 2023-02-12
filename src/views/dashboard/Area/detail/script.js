const modalDeleteStop = document.getElementById("stopDeleteModal");
const buttonDeleteStop = document.getElementById("deleteStop")

addEventListener('load',async  () =>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log("Query String --> ", queryString)
    const response = await window.electronAPI.getAreaById({id: urlParams.get('id')});
    console.log("------ AREA SCRIPT --> ", response)

    const titlePage = document.getElementById('titlePage');
    titlePage.innerText = `Détail de la zone ${response.name}`
    const listStop = document.getElementById("listStop")
    response.stopList.forEach((stop) => {
        const li = document.createElement("li");
        const text = document.createElement("span")
        text.innerText = `${stop.name}`;
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
            modalDeleteStop.dataset.id = stop.id
        })

        li.append(text, btnDelete)
        li.className = 'list-group-item d-flex justify-content-between'
        listStop.appendChild(li)
    })
});

buttonDeleteStop.addEventListener('click', () => {
    console.log("Click btn delete go do action for all remove !! id --> ", modalDeleteStop.dataset.id)
    window.electronAPI.deleteStopById({id: modalDeleteStop.dataset.id});

})
