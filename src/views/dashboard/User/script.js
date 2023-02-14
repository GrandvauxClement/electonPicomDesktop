const dataTableBody = document.getElementById("user-data-table-content")


addEventListener('load',async  () =>{

    const response = await window.electronAPI.getAllUser();

    response.forEach((data) => {
        const tr = document.createElement('tr');
        const tdCompany = document.createElement('td');
        tdCompany.innerText = `${data.companyName}`;
        const tdEmail = document.createElement('td');
        tdEmail.innerText = `${data.email}`;
        const tdPhone = document.createElement('td');
        tdPhone.innerText = `${data.phoneNumber}`;
        const tdName = document.createElement('td');
        tdName.innerText = `${data.lastName} ${data.firstName}`;
        const tdAdLength = document.createElement('td');
        tdAdLength.innerText = `${data.adList.length}`
        const tdAction = document.createElement('td');

        const editBtn = document.createElement('button')
        editBtn.classList.add('btn', 'btn-outline-warning', 'mx-2')
        editBtn.innerText = 'Modif.'
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
        tr.append(tdCompany, tdEmail, tdPhone, tdName, tdAdLength, tdAction)
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
    document.getElementById('picture').src = profile.picture;
    document.getElementById('name').innerText = profile.name;
    document.getElementById('success').innerText = 'You successfully used OpenID Connect and OAuth 2.0 to authenticate.';
});
