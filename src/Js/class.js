/*------------------------------------------------------
Nom de projet : PAFI
Autheur : Mboulefack Lekane Loic
version : 1.0.1
------------------------------------------------------*/


class Parrain {
  constructor(nom) {
    this.nom = nom;
    this.tabFilleul = [];
  }
}

class Filleul {
  constructor(nom) {
    this.nom = nom;
    this.tabParrain = [];
  }
}

export default { Parrain, Filleul };