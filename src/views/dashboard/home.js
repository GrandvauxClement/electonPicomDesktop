addEventListener('load',async  () =>{
    const profile = await window.electronAPI.getProfile();
    console.log("profile --> ", profile)
    const response = await window.electronAPI.getPrivateData();

    document.getElementById('picture').src = profile.picture;
    document.getElementById('name').innerText = profile.name;
    document.getElementById('success').innerText = 'You successfully used OpenID Connect and OAuth 2.0 to authenticate.';
});

document.getElementById('secured-request').onclick = async () => {
    try {
        const response = await window.electronAPI.getPrivateData();
        console.log("Response get data --> ", response)
        const messageJumbotron = document.getElementById('message');
        messageJumbotron.innerText = response;
        messageJumbotron.style.display = 'block';
    } catch(error) {
        console.error('Error connecting to te API: ' + error);
    }
};
