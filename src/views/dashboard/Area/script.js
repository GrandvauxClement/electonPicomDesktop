const dataTableBody = document.getElementById("user-data-table-content")
const modalDeleteArea = document.getElementById("areaDeleteModal");

addEventListener('load',async  () =>{

    const response = await window.electronAPI.getAllArea();
    console.log("------ AREA SCRIPT --> ", response)
    response.forEach((data) => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.innerText = `${data.name}`;

        const tdPrice = document.createElement('td');
        tdPrice.innerText = `${data.price}`;

        const tdNbStop = document.createElement('td');
        tdNbStop.innerText = `${data.stopList.length}`;

        const tdAction = document.createElement('td');

        const editBtn = document.createElement('a')
        editBtn.classList.add('btn', 'btn-outline-warning', 'mx-2')
        editBtn.innerText = 'Voir/Modifier'
        editBtn.href = `./detail/index.html?id=${data.id}`

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('btn', 'btn-outline-danger', 'mx-2')
        deleteBtn.innerText = 'Suppr.'
        deleteBtn.setAttribute("data-toggle", "modal");
        deleteBtn.setAttribute("data-target", "#areaDeleteModal")
        deleteBtn.addEventListener('click', async (e) => {
            modalDeleteArea.dataset.id = data.id
        })
        tdAction.append(editBtn, deleteBtn);
        tr.append(tdName, tdPrice, tdNbStop, tdAction)
        dataTableBody.appendChild(tr)

    })
    $('#dataTable').DataTable();
});


modalDeleteArea.addEventListener('click', async (e) => {
    console.log("Dans le bouton delete")
    await window.electronAPI.deleteAreaById({id: modalDeleteArea.dataset.id})
    window.location.reload();
})
