addEventListener('load',async  () =>{
    const profile = await window.electronAPI.getProfile();
    console.log("profile --> ", profile)

});

/*document.getElementById('secured-request').onclick = async () => {
    try {
        const response = await window.electronAPI.getPrivateData();
        console.log("Response get data --> ", response)
        const messageJumbotron = document.getElementById('message');
        messageJumbotron.innerText = response;
        messageJumbotron.style.display = 'block';
    } catch(error) {
        console.error('Error connecting to te API: ' + error);
    }
};*/
