const dataTableBody = document.getElementById("user-data-table-content")
const modalDeleteArea = document.getElementById("areaDeleteModal");
const buttonDeleteArea = document.getElementById("deleteStop")

addEventListener('load',async  () =>{

    const response = await window.electronAPI.getAllArea();
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
    $('#dataTable').DataTable({
        language: {
            processing:     "Traitement en cours...",
            search:         "Rechercher&nbsp;:",
            lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
            info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
            infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            infoPostFix:    "",
            loadingRecords: "Chargement en cours...",
            zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            emptyTable:     "Aucune donnée disponible dans le tableau",
            paginate: {
                first:      "Premier",
                previous:   "Pr&eacute;c&eacute;dent",
                next:       "Suivant",
                last:       "Dernier"
            },
            aria: {
                sortAscending:  ": activer pour trier la colonne par ordre croissant",
                sortDescending: ": activer pour trier la colonne par ordre décroissant"
            }
        }
    } );
});

buttonDeleteArea.addEventListener('click', async (e) => {
    await window.electronAPI.deleteAreaById({id: modalDeleteArea.dataset.id})
    window.location.reload();
})
