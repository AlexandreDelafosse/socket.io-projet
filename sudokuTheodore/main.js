let sudoku = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "1", "2", " ", "3", "4", "5", "6", "7"],
    [" ", "3", "4", "5", " ", "6", "1", "8", "2"],
    [" ", " ", "1", " ", "5", "8", "2", " ", "6"],
    [" ", " ", "8", "6", " ", " ", " ", " ", "1"],
    [" ", "2", " ", " ", " ", "7", " ", "5", " "],
    [" ", " ", "3", "7", " ", "5", " ", "2", "8"],
    [" ", "8", " ", " ", "6", " ", "7", " ", " "],
    ["2", " ", "7", " ", "8", "3", "6", "1", "5"]
];


let nbCarre = [];
let nbLigne = [];
let nbColone = [];

let listeNb = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

let element = document.getElementById("mainBody");

function creerTableau() {

    for (let ligne = 0; ligne < 9; ligne++) {
        let uneLigne = document.createElement("div");
        uneLigne.style.display = "flex"

        for (let colone = 0; colone < 9; colone++) {
            let uneCase = document.createElement("div");
            uneCase.style.width = "40px";
            uneCase.style.height = "40px";
            uneCase.style.border = "1px solid black";
            uneCase.style.display = "flex";
            uneCase.style.alignItems = "center";
            uneCase.style.justifyContent = "center";
            uneCase.id = "L" + ligne + "C" + colone

            uneCase.innerHTML = sudoku[ligne][colone]
            uneLigne.append(uneCase);

        }
        element.append(uneLigne)
    }

}
creerTableau();

function trouveColone() {

    for (let index = 0; index < 9; index++) {
        let ajoutColone = listeNb;
        for (let i = 0; i < sudoku.length; i++) {

            if (sudoku[i][index] != " " && sudoku[i][index] != "") {

                ajoutColone = ajoutColone.filter(function (value) {
                    return value != sudoku[i][index];
                });
            }

        }
        nbColone.push(ajoutColone);

    }

    console.log("nbColone ", nbColone);

}
trouveColone();

function trouveLigne() {
    for (let index = 0; index < 9; index++) {
        let ajoutLigne = listeNb;

        for (let i = 0; i < sudoku.length; i++) {

            if (sudoku[index][i] != " " && sudoku[index][i] != "") {
                ajoutLigne = ajoutLigne.filter(function (value) {
                    return value != sudoku[index][i];
                });
            }

        }

        nbLigne.push(ajoutLigne);


    }

    console.log("nbLigne ", nbLigne);
}
trouveLigne();

function trouveCarre() {
    for (let index = 0; index < 9; index++) {

        let ajoutCarre = listeNb;

        if (index == 0 || index == 3 || index == 6) {
            for (let i = 0; i < 9; i++) {

                if (i <= 2) {
                    for (let innerId = 0; innerId < 3; innerId++) {

                        if (sudoku[index][innerId] != " " && sudoku[index][innerId] != "") {

                            ajoutCarre = ajoutCarre.filter(function (value) {
                                return value != sudoku[index][innerId];
                            });
                        }
                    }
                } else {
                    if (i > 2 && i <= 5) {
                        for (let innerId = 0; innerId < 3; innerId++) {

                            if (sudoku[index + 1][innerId] != " " && sudoku[index + 1][innerId] != "") {

                                ajoutCarre = ajoutCarre.filter(function (value) {
                                    return value != sudoku[index + 1][innerId];
                                });
                            }
                        }
                    } else {
                        if (i > 5 && i <= 8) {
                            for (let innerId = 0; innerId < 3; innerId++) {

                                if (sudoku[index + 2][innerId] != " " && sudoku[index + 2][innerId] != "") {

                                    ajoutCarre = ajoutCarre.filter(function (value) {
                                        return value != sudoku[index + 2][innerId];
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }

        if (index == 1 || index == 4 || index == 7) {
            for (let i = 0; i < 9; i++) {
                if (i <= 2) {
                    for (let innerId = 3; innerId < 6; innerId++) {

                        if (sudoku[index - 1][innerId] != " " && sudoku[index - 1][innerId] != "") {

                            ajoutCarre = ajoutCarre.filter(function (value) {
                                return value != sudoku[index - 1][innerId];
                            });
                        }
                    }
                } else {
                    if (i > 2 && i <= 5) {
                        for (let innerId = 3; innerId < 6; innerId++) {
                            if (sudoku[index][innerId] != " " && sudoku[index][innerId] != "") {

                                ajoutCarre = ajoutCarre.filter(function (value) {
                                    return value != sudoku[index][innerId];
                                });
                            }
                        }
                        sudoku[index + 1][i]
                    } else {
                        if (i > 5 && i <= 8) {
                            for (let innerId = 3; innerId < 6; innerId++) {
                                if (sudoku[index + 1][innerId] != " " && sudoku[index + 1][innerId] != "") {

                                    ajoutCarre = ajoutCarre.filter(function (value) {
                                        return value != sudoku[index + 1][innerId];
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }

        if (index == 2 || index == 4 || index == 8) {
            for (let i = 0; i < 9; i++) {
                if (i <= 2) {
                    for (let innerId = 6; innerId < 9; innerId++) {

                        if (sudoku[index - 2][innerId] != " " && sudoku[index - 2][innerId] != "") {

                            ajoutCarre = ajoutCarre.filter(function (value) {
                                return value != sudoku[index - 2][innerId];
                            });
                        }
                    }
                } else {
                    if (i > 2 && i <= 5) {
                        for (let innerId = 6; innerId < 9; innerId++) {
                            if (sudoku[index - 1][innerId] != " " && sudoku[index - 1][innerId] != "") {

                                ajoutCarre = ajoutCarre.filter(function (value) {
                                    return value != sudoku[index - 1][innerId];
                                });
                            }
                        }
                    } else {
                        if (i > 5 && i <= 8) {
                            for (let innerId = 6; innerId < 9; innerId++) {
                                if (sudoku[index][innerId] != " " && sudoku[index][innerId] != "") {

                                    ajoutCarre = ajoutCarre.filter(function (value) {
                                        return value != sudoku[index][innerId];
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }

        nbCarre.push(ajoutCarre);

    }
    console.log("nbCarre ", nbCarre);
}
trouveCarre();

function trouveCommun(carre, ligne, col) {
    nbCarre = [];
    nbLigne = [];
    nbColone = [];

    trouveColone();
    trouveLigne();
    trouveCarre();

    let test = [carre, ligne, col]
    let arr4 = test.slice();
    return arr4.shift().filter(function (v) {
        return arr4.every(function (a) {
            return a.indexOf(v) !== -1;
        });
    });
}

function verifColLigneCarre(number) {

}

function resoudreSudo2(leSudoku) {
    let tmpSudo = leSudoku;
    
}

function resoudreSudoku(leSudoku) {
    let tmpSudo = leSudoku;
    let caseModif = [];

    leSudoku.forEach((uneLigne, ligneId) => {
        uneLigne.forEach((uneCase, caseId) => {
            let possibleRep = [];
            let nonmbredeRepPossible = 0;
            let monTest;


            if (uneCase == "" || uneCase == " ") {
                if (caseId <= 2 && (ligneId <= 2)) {
                    monTest = trouveCommun(nbCarre[0],
                        nbLigne[ligneId],
                        nbColone[caseId]);
                }
                if (caseId <= 2 && ligneId > 2 && ligneId <= 5) {
                    monTest = trouveCommun(nbCarre[1],
                        nbLigne[ligneId],
                        nbColone[caseId]);
                }
                if (caseId <= 2 && ligneId > 5) {
                    monTest = trouveCommun(nbCarre[2],
                        nbLigne[ligneId],
                        nbColone[caseId]);
                }


                if (caseId > 2 && caseId <= 5 && (ligneId <= 2)) {
                    monTest = trouveCommun(nbCarre[3],
                        nbLigne[ligneId],
                        nbColone[caseId]);
                }
                if (caseId > 2 && caseId <= 5 && ligneId > 2 && ligneId <= 5) {
                    monTest = trouveCommun(nbCarre[4],
                        nbLigne[ligneId],
                        nbColone[caseId]);
                }
                if (caseId > 2 && caseId <= 5 && ligneId > 5) {
                    monTest = trouveCommun(nbCarre[5],
                        nbLigne[ligneId],
                        nbColone[caseId]);
                }


                if (caseId > 5 && (ligneId <= 2)) {
                    monTest = trouveCommun(nbCarre[6],
                        nbLigne[ligneId],
                        nbColone[caseId]);
                }
                if (caseId > 5 && ligneId > 2 && ligneId <= 5) {
                    monTest = trouveCommun(nbCarre[7],
                        nbLigne[ligneId],
                        nbColone[caseId]);
                }
                if (caseId > 5 && ligneId > 5) {
                    monTest = trouveCommun(nbCarre[8],
                        nbLigne[ligneId],
                        nbColone[caseId]);
                }

                nonmbredeRepPossible = monTest.length;
                // let possibleRepUneCase = {
                //     idChoisi: 0,
                //     lesRep: monTest
                // };



                // caseModif.push(possibleRep);

                // tmpSudo[ligneId][caseId] = possibleRepUneCase.lesRep[possibleRepUneCase.idChoisi];

                caseARemplir = document.getElementById("L" + ligneId + "C" + caseId);
                caseARemplir.style.color = "red"
                caseARemplir.innerHTML = monTest[0];
            }
        });
    });
}

resoudreSudoku(sudoku)