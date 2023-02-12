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
    $('#dataTable').DataTable();
    document.getElementById('picture').src = profile.picture;
    document.getElementById('name').innerText = profile.name;
    document.getElementById('success').innerText = 'You successfully used OpenID Connect and OAuth 2.0 to authenticate.';
});
