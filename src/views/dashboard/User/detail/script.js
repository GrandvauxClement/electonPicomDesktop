const titlePage = document.getElementById("titlePage");
const nameUserInfo = document.getElementById("nameUserInfo");
const emailUserInfo = document.getElementById("emailUserInfo");
const companyUserInfo = document.getElementById("companyUserInfo");
const siretUserInfo = document.getElementById("siretUserInfo");
const phoneUserInfo = document.getElementById("phoneUserInfo");
const addressUserInfo = document.getElementById("addressUserInfo");
const verifiedUserInfo = document.getElementById("verifiedUserInfo");
const listAds = document.getElementById("listAds");


const getIdParamsOnRoad = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id')
}

const calculateTotalPriceDiffusionOfAd = (ad) => {
  let totalPrice = 0;
  ad.adAreaList.forEach((adArea) => {
      adArea.timeIntervalList.forEach((timeInterval) => {
          totalPrice += timeInterval.coefMulti * adArea.area.price
      })
  })
   return totalPrice * ad.numDaysOfDiffusion;
}

const createLiListAds = (data) => {
    console.log("Create li ad IDD !!! -> ", data.id);
    const li = document.createElement("li");
    const row = document.createElement("div");
    row.className = "row align-items-center";

    const col1 = document.createElement("div");
    col1.className = "col-12 col-md-6";

    const col2 = document.createElement("div");
    col2.className = "col-12 col-md-6";

    const title = document.createElement("h5")
    title.innerText = `Titre : ${data.title}`;

    const createdAt = document.createElement("p")
    createdAt.innerText = `Date dé début de diffusion : ${data.createdAt}`;

    const startAt = document.createElement("p")
    startAt.innerText = `Date dé début de diffusion : ${data.startAt}`;

    const totalPrice = document.createElement("p");
    totalPrice.innerText = `Prix total de diffusion : ${calculateTotalPriceDiffusionOfAd(data).toFixed(2)} €`

    const numDaysOfDiffusion = document.createElement("p")
    numDaysOfDiffusion.innerText = `Nombre de jour de diffusion : ${data.numDaysOfDiffusion}`;

    let imageOrTextDisplay ;
    if (data.image === null){
        imageOrTextDisplay = document.createElement("p");
        imageOrTextDisplay = `Description : ${data.text}`
    } else {
        imageOrTextDisplay = document.createElement("img");
        imageOrTextDisplay.src = `http://127.0.0.1:8280/assets/${data.image}`;
        imageOrTextDisplay.alt = 'image de presentation'
        imageOrTextDisplay.className = 'img-fluid'
        imageOrTextDisplay.style.cssText = "max-height:300px"
    }

    const divListArea = document.createElement('ol');

    data.adAreaList.forEach((adArea) => {
        const areaContainer = document.createElement("li");
        const areaName = document.createElement("p");
        areaName.innerText = `Zone de diffusion : ${adArea.area.name}`
        let stockTimeInterval = "";
        adArea.timeIntervalList.forEach((timeInterval, index) => {
            stockTimeInterval += ` ${timeInterval.timeSlot} h`
            if (index !== 0 || index !==  adArea.timeIntervalList.length -1){
                stockTimeInterval += ", "
            }
        })
        const timeIntervalContainer = document.createElement('p');
        timeIntervalContainer.innerText = `Créneaux horaires sélectionné : ${stockTimeInterval}`
        areaContainer.append(areaName, timeIntervalContainer);
        divListArea.append(areaContainer)
    })

    col1.append(title, createdAt, startAt, numDaysOfDiffusion, totalPrice, divListArea);
    col2.append(imageOrTextDisplay)
    row.append(col1, col2)
    li.append(row)
    li.className = 'list-group-item row'
    listAds.appendChild(li)
}

addEventListener('load', async () => {
    const userDetails = await window.electronAPI.getUserById({id: getIdParamsOnRoad()});
    const adDetails = await window.electronAPI.getAdsByUserId({id: getIdParamsOnRoad()});
    titlePage.innerText = `Détail de l'utilisateur ${userDetails.lastName} ${userDetails.firstName} `
    nameUserInfo.innerText = ` ${userDetails.lastName} ${userDetails.firstName} `;
    emailUserInfo.innerText = ` ${userDetails.email}`;
    companyUserInfo.innerText = ` ${userDetails.companyName}`;
    siretUserInfo.innerText = ` ${userDetails.numSiret}`;
    phoneUserInfo.innerText = ` ${userDetails.phoneNumber}`;
    addressUserInfo.innerText = ` ${userDetails.roadName} ${userDetails.postalCode}`;
    verifiedUserInfo.innerText = ` ${userDetails.verified}`;

    adDetails.forEach((ad) => {
        createLiListAds(ad);
    })
})
