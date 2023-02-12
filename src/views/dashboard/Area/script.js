const dataTableBody = document.getElementById("user-data-table-content")


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

        const editBtn = document.createElement('button')
        editBtn.classList.add('btn', 'btn-outline-warning', 'mx-2')
        editBtn.innerText = 'Voir/Modifier'
        editBtn.addEventListener('click', (e) => {
            console.log("Dans le bouton voir")
        })

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('btn', 'btn-outline-danger', 'mx-2')
        deleteBtn.innerText = 'Suppr.'
        deleteBtn.addEventListener('click', (e) => {
            console.log("Dans le bouton delete")
        })
        tdAction.append(editBtn, deleteBtn);
        tr.append(tdName, tdPrice, tdNbStop, tdAction)
        dataTableBody.appendChild(tr)

    })
    $('#dataTable').DataTable();
});
