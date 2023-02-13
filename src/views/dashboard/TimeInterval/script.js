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
    $('#dataTable').DataTable();
    document.getElementById('success').innerText = 'You successfully used OpenID Connect and OAuth 2.0 to authenticate.';
});

updateTimeIntervalBtn.addEventListener('click', async (e) => {
    await window.electronAPI.updateTimeInterval({
        id: modalEditTimeInterval.dataset.id,
        timeSlot: modalEditTimeInterval.dataset.timeSlot,
        coefMulti: inputCoef.value
    });
})
