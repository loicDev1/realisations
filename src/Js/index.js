/*------------------------------------------------------
Nom de projet : PAFI
Autheur : Mboulefack Lekane Loic
version : 1.0.1
------------------------------------------------------*/

/*----------------------global scope------------------------------*/
import object from "./instances.js";
const { initialisation, NbreAleatoire, insertImage, getSetLocalStorage, playMusic } =
  object;

let tabParrain = [],
  tabFilleul = [],
  tab_ParrainSuprimee = [],
  tab_FilleulSuprimee = [],
  reNewParrain = [],
  reNewFilleul = [],
  valueReturn,
  i = 0;

let promise = initialisation(tabParrain, tabFilleul);
promise
  .then((result) => {
    tabParrain = result.tabParrain;
    tabFilleul = result.tabFilleul;
  })
  .catch((err) => {});

let start = document.getElementById("start"),
  reset = document.querySelector(".reset"),
  popup = document.querySelector(".popup"),
  masque = document.querySelector(".affiche"),
  popFin = document.querySelector(".fin"),
  close = document.getElementById("close");

/*------------------------------------local storage---------------*/
if (!localStorage.tabFinal) {
  localStorage.setItem("tabFinal", "[]");
}
/*------------------------------------local storage--------------*/

let affectations = () => {
  const indexParrain = NbreAleatoire(tabParrain.length);
  const indexFilleul = NbreAleatoire(tabFilleul.length);

  if (tabParrain.length && tabFilleul.length) {
    const elParrainSup = tabParrain.splice(indexParrain, 1)[0];
    tab_ParrainSuprimee.push(elParrainSup);
    const elFilleulSup = tabFilleul.splice(indexFilleul, 1)[0];
    tab_FilleulSuprimee.push(elFilleulSup);

    tab_ParrainSuprimee[i].tabFilleul.push(elFilleulSup);
    tab_FilleulSuprimee[i].tabParrain.push(elParrainSup);
    /*---------------------------------------------------------------------------*/
    let delay = 5;
    start.style.visibility = "hidden";
    let animation = setInterval(() => {
      if (delay > 1) {
        delay--;
        popup.innerHTML = delay;
      } else if (delay == 1) {
        getSetLocalStorage(
          tab_ParrainSuprimee[i].nom,
          tab_ParrainSuprimee[i].tabFilleul[0].nom
        );
        insertImage(
          tab_ParrainSuprimee[i].nom,
          tab_ParrainSuprimee[i].tabFilleul[0].nom
        );
        tab_ParrainSuprimee[i].tabFilleul.splice(0, 1);
        popup.innerHTML = delay;
        masque.classList.toggle("affiche");
        popup.classList.toggle("animation");
        start.style.visibility = "visible";
        clearInterval(animation);
        popup.innerHTML = 5;
        playMusic();
        i++;
      }
    }, 1000);
    popup.classList.toggle("animation");
    masque.classList.toggle("affiche");

    /*---------------------------------------------------------------------------*/
  } else if (!tabParrain.length && tabFilleul.length > 0) {
    if (reNewParrain.length == 0) {
      valueReturn = initialisation(reNewParrain, reNewFilleul);
      valueReturn
        .then((result) => {
          reNewParrain = result.tabParrain;
          reNewFilleul = result.tabFilleul;
        })
        .catch((err) => {});
    }
    valueReturn
      .then((result) => {
        const indexRenewEl = NbreAleatoire(reNewParrain.length);
        let deleteElRenew = reNewParrain.splice(indexRenewEl, 1)[0];
        let deleteFillieul = tabFilleul.splice(indexFilleul, 1)[0];
        /*je peux afficher ici*/
        for (let j = 0; j < tab_ParrainSuprimee.length; j++) {
          if (tab_ParrainSuprimee[j].nom == deleteElRenew.nom) {
            deleteFillieul.tabParrain.push(tab_ParrainSuprimee[j]);
            tab_ParrainSuprimee[j].tabFilleul.push(deleteFillieul);
            tab_FilleulSuprimee.push(deleteFillieul);
            /*---------------------------------------------------------------------------*/
            let delay = 5;
            start.style.visibility = "hidden";
            let animation = setInterval(() => {
              if (delay > 1) {
                delay--;
                popup.innerHTML = delay;
              } else if (delay == 1) {
                getSetLocalStorage(
                  tab_ParrainSuprimee[j].nom,
                  tab_ParrainSuprimee[j].tabFilleul[0].nom
                );
                insertImage(
                  tab_ParrainSuprimee[j].nom,
                  tab_ParrainSuprimee[j].tabFilleul[0].nom
                );
                tab_ParrainSuprimee[j].tabFilleul.splice(0, 1);
                popup.innerHTML = delay;
                masque.classList.toggle("affiche");
                popup.classList.toggle("animation");
                start.style.visibility = "visible";
                clearInterval(animation);
                popup.innerHTML = 5;
                playMusic();
              }
            }, 1000);
            popup.classList.toggle("animation");
            masque.classList.toggle("affiche");
            /*---------------------------------------------------------------------------*/
          }
        }
      })
      .catch((err) => {});
  } else if (tabParrain.length > 0 && !tabFilleul.length) {
    if (reNewFilleul.length == 0) {
      valueReturn = initialisation(reNewParrain, reNewFilleul);
      valueReturn
        .then((result) => {
          reNewParrain = result.tabParrain;
          reNewFilleul = result.tabFilleul;
        })
        .catch((err) => {});
    }
    valueReturn
      .then((result) => {
        const indexRenewEl = NbreAleatoire(reNewFilleul.length);
        let deleteElRenew = reNewFilleul.splice(indexRenewEl, 1)[0];
        let deleteParrain = tabParrain.splice(
          NbreAleatoire(tabParrain.length),
          1
        )[0];
        deleteElRenew.tabParrain.push(deleteParrain);
        deleteParrain.tabFilleul.push(deleteElRenew);
        tab_ParrainSuprimee.push(deleteParrain);
        /*---------------------------------------------------------------------------*/
        let delay = 5;
        start.style.visibility = "hidden";
        let animation = setInterval(() => {
          if (delay > 1) {
            delay--;
            popup.innerHTML = delay;
          } else if (delay == 1) {
            i++;
            getSetLocalStorage(
              tab_ParrainSuprimee[i - 1].nom,
              tab_ParrainSuprimee[i - 1].tabFilleul[0].nom
            );
            insertImage(
              tab_ParrainSuprimee[i - 1].nom,
              tab_ParrainSuprimee[i - 1].tabFilleul[0].nom
            );
            popup.innerHTML = delay;
            popup.classList.toggle("animation");
            masque.classList.toggle("affiche");
            start.style.visibility = "visible";
            clearInterval(animation);
            popup.innerHTML = 5;
            playMusic();
          }
        }, 1000);
        popup.classList.toggle("animation");
        masque.classList.toggle("affiche");
        /*---------------------------------------------------------------------------*/
      })
      .catch((err) => {});
  } else if (!tabParrain.length && !tabFilleul.length) {
    popFin.classList.toggle("cacher");
    popFin.classList.add("popanimation");
    console.log("c'est finis");
  }
};

start.addEventListener("click", affectations);

/*document.addEventListener("keypress", event => {
    if (event.keyCode === 13) affectations()
  }); */

let reinitialiser = () => {
  (tabParrain = []),
    (tabFilleul = []),
    (tab_ParrainSuprimee = []),
    (tab_FilleulSuprimee = []),
    (reNewParrain = []),
    (reNewFilleul = []),
    (valueReturn = null),
    (i = 0);
  localStorage.setItem("tabFinal", "[]");
  let promise = initialisation(tabParrain, tabFilleul);
  promise
    .then((result) => {
      tabParrain = result.tabParrain;
      tabFilleul = result.tabFilleul;
    })
    .catch((err) => {});

  insertImage("PARRAIN_NAME", "FILLEUL_NAME", true);
};

reset.addEventListener("click", () => {
  confirm("voulez vous reinitialiser cette partie ?") && reinitialiser();
});

document.addEventListener("keydown", (event) => {
  /*echap == 27*/
  if (event.keyCode === 27) {
    confirm("voulez vous reinitialiser cette partie ?") && reinitialiser();
  }
});

window.addEventListener("load", () => {
  localStorage.setItem("tabFinal", "[]");
});
close.addEventListener("click", () => {
  popFin.classList.toggle("cacher");
});
