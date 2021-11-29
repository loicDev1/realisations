/*------------------------------------------------------
Nom de projet : PAFI
Autheur : Mboulefack Lekane Loic
version : 1.0.1
------------------------------------------------------*/

const container = document.querySelector(".container");
const tab = document.querySelector(".tab");
const liste = JSON.parse(localStorage.getItem("tabFinal"));

if (liste.length) {
  tab.innerHTML += `<tr> <td class="colorP">Noms Parains</td> <td class="colorF"> Nom Filleuls</td> </tr>`;
  liste.forEach((element) => {
    tab.innerHTML += `<tr> <td>${element.parrain.toUpperCase()}</td> <td>${element.filleul.toUpperCase()}</td> </tr>`;
  });
} else {
  container.innerHTML = `<div><h1> aucune validation nas eu lieu... </h1></div>`;
}
