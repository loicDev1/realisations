/*------------------------------------------------------
Nom de projet : PAFI
Autheur : Mboulefack Lekane Loic
version : 1.0.1
------------------------------------------------------*/

import objets from "./class.js";
const { Parrain, Filleul } = objets;
const photoP = document.querySelector(".parrain");
const photoF = document.querySelector(".filleul");
const nomP = document.querySelector(".nomp_parrain span");
const nomF = document.querySelector(".nomp_filleul span");


const initialisation = async (tabParrain, tabFilleul) => {
  const requette = new Request("../../data/data.json");
  const promesse = await fetch(requette);
  const data = await promesse.json();
  const { nomsParrains, nomsFilleuls } = data;
  nomsParrains.forEach((element) => {
    tabParrain.push(new Parrain(element));
  });
  nomsFilleuls.forEach((element) => {
    tabFilleul.push(new Filleul(element));
  });
  return { tabParrain, tabFilleul };
};

let NbreAleatoire = (max) => Math.floor(Math.random() * max);

let insertImage = (nameParrain, nameFilleul, bolean) => {
  if (!bolean) {
    photoP.innerHTML = `<img src="img/parrain img/${nameParrain}.jpg" alt="not found" srcset="">`;
    photoF.innerHTML = `<img src="img/filleul img/${nameFilleul}.jpeg" alt="not found" srcset="">`;
  } else {
    photoP.innerHTML = `<i class="fas fa-user"></i>`;
    photoF.innerHTML = `<i class="fas fa-user"></i>`;
  }
  nomP.innerHTML = nameParrain.toUpperCase();
  nomF.innerHTML = nameFilleul.toUpperCase();
};

let getSetLocalStorage = (nomParrain, nomFilleul) => {
  const objt = JSON.parse(localStorage.getItem("tabFinal"));
  objt.push({ parrain: nomParrain, filleul: nomFilleul });
  localStorage.setItem("tabFinal", JSON.stringify(objt));
};

const tabMusic = ["watto.mp3"];
const musicSelected = new Audio(`./audio/${tabMusic[NbreAleatoire(tabMusic.length)]}`);
let playMusic = () => {
  setTimeout(() => {
    musicSelected.play()
  }, 500);
}

export default {
  initialisation,
  NbreAleatoire,
  insertImage,
  getSetLocalStorage,
  playMusic
};
