const dataTableBody = document.getElementById("user-data-table-content")
const modalEditTimeInterval = document.getElementById("updateTimeIntervalModal")
const inputCoef = document.getElementById("inputCoef")
const titleModal = document.getElementById("updateTimeIntervalModalLabel")
const updateTimeIntervalBtn = document.getElementById("updateTimeInterval");

addEventListener('load',async  () =>{

    const response = await window.electronAPI.getAllTimeInterval();

    response.forEach((data) => {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        tdId.innerText = `${data.id}`;
        const tdTimeSlot = document.createElement('td');
        tdTimeSlot.innerText = `${data.timeSlot} h`;
        const tdCoef = document.createElement('td');
        tdCoef.innerText = `${data.coefMulti}`;
        tdCoef.id = `timeIntervalCoeff-${data.id}`

        const tdAction = document.createElement('td');

        const editBtn = document.createElement('button')
        editBtn.setAttribute("data-toggle", "modal");
        editBtn.setAttribute("data-target", "#updateTimeIntervalModal")
        editBtn.classList.add('btn', 'btn-outline-warning', 'mx-2')
        editBtn.innerText = 'Modifier'
        editBtn.addEventListener('click', (e) => {
            console.log("Dans le bouton voir")
            titleModal.innerText = `Vous allez modifier le crénaux horraire ${data.timeSlot}`
            modalEditTimeInterval.dataset.id = data.id
            modalEditTimeInterval.dataset.timeSlot = data.timeSlot
            inputCoef.value = data.coefMulti
        })

        tdAction.append(editBtn);
        tr.append(tdId, tdTimeSlot, tdCoef, tdAction)
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
    document.getElementById('success').innerText = 'You successfully used OpenID Connect and OAuth 2.0 to authenticate.';
});

updateTimeIntervalBtn.addEventListener('click', async (e) => {
    const idSelected = modalEditTimeInterval.dataset.id;
    await window.electronAPI.updateTimeInterval({
        id: idSelected,
        timeSlot: modalEditTimeInterval.dataset.timeSlot,
        coefMulti: inputCoef.value
    });
    document.getElementById(`timeIntervalCoeff-${idSelected}`).innerText = inputCoef.value;
    document.getElementById("closeModalTimeIntervalUpdate").click();
})
