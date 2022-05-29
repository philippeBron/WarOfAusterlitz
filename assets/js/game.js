const getParams = () => {
    let params = []
    if(document.location.toString().indexOf('?') !== -1) {
        let query = document.location
                    .toString()
                    // get the query string
                    .replace(/^.*?\?/, '')
                    // and remove any existing hash string (thanks, @vrijdenker)
                    .replace(/#.*$/, '')
                    .split('&')

        for(let i=0, l=query.length; i<l; i++) {
            let aux = decodeURIComponent(query[i]).split('=')
            let param = [aux[0], aux[1]]
            params.push(param)
        }
    }
    //get the 'index' query parameter
    return params
}

const createBattle = (currentBattle) => {

    const elecdb= require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    // create and clean battle data
    elecdb.createTable(currentBattle, location, (succ, msg) => {
        console.log("Success: " + succ)
        console.log("Message: " + msg)
    })

    if(elecdb.valid(currentBattle, location)) {         
        elecdb.clearTable(currentBattle, location, (succ, msg) => {
            console.log(`Success: ${succ}`)
            console.log(`Message: ${msg}`)
        })
    }


    // let set = {
    //     "moral": 0.1
    // }

    // if (elecdb.valid('troupes', location)) {         
    //     elecdb.updateRow('troupes', location, where, set, (succ, data) => {
    //         if(succ) {
    //             console.log("Success: " + succ)
    //         } else {
    //             console.log('An error has occured.')
    //             console.log(`Message: ${data}`)
    //         }
    //         // console.log(generauxFr)
    //         // console.log(generauxRu)
    //     })
    // }

}

const storeGeneral = (battle, general) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    if(elecdb.valid(battle, location)) {
        elecdb.insertTableContent(battle, location, general, (succ, msg) => {
            console.log(`Success: ${succ}`)
            console.log(`Message: ${msg}`)
        })
    } else {
        console.log('An error has occured.')
        console.log(`Message: ${data}`)
    }
}

const storeOrders = (battle, armee, ordres, nomCase) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let obj = new Object()
    obj.type = "ordres"
    obj.armee = armee
    obj.ordres = ordres
    obj.nomCase = nomCase

    if(elecdb.valid(battle, location)) {
        elecdb.insertTableContent(battle, location, obj, (succ, msg) => {
            console.log(`Success: ${succ}`)
            console.log(`Message: ${msg}`)
        })
    } else {
        console.log('An error has occured.')
        console.log(`Message: ${data}`)
    }
}

const storeAppuiArtillerie = (battle, appuiArtillerie) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    if(elecdb.valid(battle, location)) {
        elecdb.insertTableContent(battle, location, appuiArtillerie, (succ, msg) => {
            console.log(`Success: ${succ}`)
            console.log(`Message: ${msg}`)
        })
    } else {
        console.log('An error has occured.')
        console.log(`Message: ${data}`)
    }
}

const storeCharge = (battle, charge) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    if(elecdb.valid(battle, location)) {
        elecdb.insertTableContent(battle, location, charge, (succ, msg) => {
            console.log(`Success: ${succ}`)
            console.log(`Message: ${msg}`)
        })
    } else {
        console.log('An error has occured.')
        console.log(`Message: ${data}`)
    }
}

const getAppuiArtillerie = (artilleries, input) => {
    let appuiArtillerie = []
    input.forEach(artillerie => {
        if (artillerie[0].split("_")[0] == "dist") {
            artilleries.forEach(element => {
                if (artillerie[0].split("_")[1] == element) {
                    let involvedArtillerie = getArtillerie(element)
                    involvedArtillerie.distance = parseInt(artillerie[1])
                    appuiArtillerie.push(involvedArtillerie)
                }
                
            });
        }
    })
    return appuiArtillerie
}

const getAttaque = (troupes, input) => {
    let attaqueTroupes = []
    input.forEach(troupe => {
        if (troupe[0].split("_")[0] == "nbUnit") {
            troupes.forEach(element => {
                if (troupe[0].split("_")[1] == element) {
                    let involvedTroupe = getTroupe(element)
                    involvedTroupe.nbUnit = parseFloat(troupe[1])
                    attaqueTroupes.push(involvedTroupe)
                }
                
            });
        }
    })
    return attaqueTroupes

}

const startBattle = () => {
    // recuperation de l index courant de la bataille
    const indexBataille = parseInt(localStorage.getItem("indexBataille"))

    // nettoyage du localstorage
    localStorage.clear()
    
    // increment de indexBataille
    localStorage.setItem("indexBataille", indexBataille + 1)

    // creation et stockage du nom de la bataille en cours
    const currentBattle = `battle#${indexBataille + 1}`
    localStorage.setItem("currentBattle", currentBattle)

    // creation de la base pour la nouvelle bataille
    createBattle(currentBattle)

    // recupere les noms des generaux selectionnes pour la zone de combat (page precedente)
    const selectedGeneraux = getParams()
    let generaux = []
    let titleText = "Quels sont les ordres de"
    for (let index = 0; index < selectedGeneraux.length; index++) {
        const general = getGeneral(selectedGeneraux[index][0])
        generaux.push(general)
        storeGeneral(currentBattle, general)
    }

    let nbGnxFR = 0
    generaux.forEach(general => {        
        if (general.armee == 'fr') {
            if (nbGnxFR > 0) {
                titleText = titleText + " / " + general.nom
            } else {
                titleText = titleText + " " + general.nom
            }
            nbGnxFR++
        }
    });

    titleText = titleText + " ?"
    let title = document.getElementById("ordresTitle")
    title.textContent = titleText
}

const getRUorders = () => {
    // recupere le nom de la battaille en cours
    const battle = localStorage.getItem("currentBattle")

    // recupere du nom de la case de combat
    const nomCaseCombat = localStorage.getItem("nomCase")
    let divCaseCombat = document.getElementById("nomCaseCombat")
    divCaseCombat.textContent = "Nom de la case de combat : " + nomCaseCombat

    // recupere les noms des generaux selectionnes pour la zone de combat (stockage battel#id)
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    const where = {
        "armee": "au-ru",
        "type": "generaux"
    }
    let generauxRu = []

    if (elecdb.valid(battle, location)) {         
        elecdb.getRows(battle, location, where, (succ, data) => {
            if(succ) {
                data.forEach(general => {                        
                    // remplis la table des troupes
                    const { nom } = general
                    generauxRu.push([nom])
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }

    // remplissage du titre avec le nom ces generaux
    let titleText = "Quels sont les ordres de"
    generauxRu.forEach(general => {
        titleText = titleText + " / " + general[0]
    })
    titleText = titleText + " ?"
    let title = document.getElementById("ordresTitle")
    title.textContent = titleText
}

const attFrontale = (armee) => {
    // sauvegarde des artilleries selecionnees pour l appui (page precedente)
    const params = getParams()
    const battle = localStorage.getItem("currentBattle")
    let artilleries = []

    params.forEach(param => {
        if (param[1] == "on") {
            artilleries.push(param[0])
        }
    })
    
    let appuiArtillerie = getAppuiArtillerie(artilleries, params)
    appuiArtillerie.forEach(artillerie => {
        console.log(artillerie);
        storeAppuiArtillerie(battle, artillerie)
    });

    // verification de la charge frontale
    if (armee == 'fr') {
        const attaqueFrontaleFR = localStorage.getItem("attaqueFrontaleFR")
        if (attaqueFrontaleFR) {
            // affichage des troupes pour selections de la charge frontale
            displayTroupes(armee)         
        } else {
            window.location.replace("attaqueLateraleFR.html")
        }     
    } else {
        const attaqueFrontaleRU = localStorage.getItem("attaqueFrontaleRU")
        if (attaqueFrontaleRU) {
            // affichage des troupes pour selections de la charge frontale
            displayTroupes(armee)         
        } else {
            window.location.replace("attaqueLateraleRU.html")
        }     
    }
}

const attLaterale = (armee) => {
    // sauvegarde des troupes selecionnees pour la charge frontale (page precedente)
    const params = getParams()
    const battle = localStorage.getItem("currentBattle")
    let troupes = []
    let avantage

    // identification des troupes selectionnes
    params.forEach(param => {
        if (param[1] == "on") {
            troupes.push(param[0])
        }
        if (param[0] == "avantage") {
            avantage = param[1]
        }
    })
    
    // recuperation des caracteristiques des troupes et du nombre d unites engagees
    let chargeFrontale = getAttaque(troupes, params)
    chargeFrontale.forEach(troupe => {
        troupe.charge = "frontale"
        troupe.avantage = parseFloat(avantage)
        storeCharge(battle, troupe)
    });

    // verification de la charge laterale
    if (armee == 'fr') {
        const attaqueLateraleFR = localStorage.getItem("attaqueLateraleFR")
        if (attaqueLateraleFR) {
            // affichage des troupes pour selections de la charge laterale
            displayTroupes(armee)  
        } else {
            window.location.replace("attaqueArriereFR.html")
        }     
    } else {
        const attaqueLateraleRU = localStorage.getItem("attaqueLateraleRU")
        if (attaqueLateraleRU) {
            // affichage des troupes pour selections de la charge laterale
            displayTroupes(armee)  
        } else {
            window.location.replace("attaqueArriereRU.html")
        }     
    }

}

const attArriere = (armee) => {
    // sauvegarde des troupes selecionnees pour la charge laterale (page precedente)
    const params = getParams()
    const battle = localStorage.getItem("currentBattle")
    let troupes = []
    let avantage

    console.log(params);

    // identification des troupes selectionnes
    params.forEach(param => {
        if (param[1] == "on") {
            troupes.push(param[0])
        }
        if (param[0] == "avantage") {
            avantage = param[1]
        }
    })

    console.log(troupes);
    
    // recuperation des caracteristiques des troupes et du nombre d unites engagees
    let chargeLaterale = getAttaque(troupes, params)
    chargeLaterale.forEach(troupe => {
        troupe.charge = "laterale"
        troupe.avantage = parseFloat(avantage)
        storeCharge(battle, troupe)
    });

    // verification de la charge arriere
    if (armee == 'fr') {
        const attaqueArriereFR = localStorage.getItem("attaqueArriereFR")
        if (attaqueArriereFR) {
            // affichage des troupes pour selections de la charge arriere
            displayTroupes(armee)  
        } else {
            window.location.replace("recapAttaqueFR.html")
        }     
    } else {
        const attaqueArriereRU = localStorage.getItem("attaqueArriereRU")
        if (attaqueArriereRU) {
            // affichage des troupes pour selections de la charge arriere
            displayTroupes(armee)  
        } else {
            window.location.replace("recapAttaque.html")
        }     
    }
}

const appuiArtillerie = (armee) => {
    console.log(getParams());
    const battle = localStorage.getItem("currentBattle")

    // le nom de la case de combat est défini en meme temps que les ordres francais
    if (armee == 'fr') {
        const nomCase = getParams()[0][1]
        const ordreFR = getParams()[1][1]

        // recuperarion de la configuration de la charge
        for (let i = 2; i < getParams().length; i++) {
            switch (getParams()[i][0]) {
                case "appuiArtillerieFR":
                    localStorage.setItem("appuiArtillerieFR", true)
                    break;
                case "attaqueFrontaleFR":
                    localStorage.setItem("attaqueFrontaleFR", true)
                    break;
                case "attaqueLateraleFR":
                    localStorage.setItem("attaqueLateraleFR", true)
                    break;
                case "attaqueArriereFR":
                    localStorage.setItem("attaqueArriereFR", true)
                    break;            
                default:
                    break;
            }            
        }
        // sauvegarde le nom de la case et l'ordre dans local storage
        localStorage.setItem("nomCase", nomCase)
        localStorage.setItem("ordreFR", ordreFR)

        // sauvegarde des ordres dans le fichier de la bataille en cours
        storeOrders(battle, armee, ordreFR, nomCase)
    }
    else{
        const ordreRU = getParams()[0][1]
        const nomCase = localStorage.getItem("nomCase")

        // sauvegarde le nom de la case et l'ordre
        localStorage.setItem("ordreRU", ordreRU)

        for (let i = 1; i < getParams().length; i++) {
            switch (getParams()[i][0]) {
                case "appuiArtillerieRU":
                    localStorage.setItem("appuiArtillerieRU", true)
                    break;
                case "attaqueFrontaleRU":
                    localStorage.setItem("attaqueFrontaleRU", true)
                    break;
                case "attaqueLateraleRU":
                    localStorage.setItem("attaqueLateraleRU", true)
                    break;
                case "attaqueArriereRU":
                    localStorage.setItem("attaqueArriereRU", true)
                    break;            
                default:
                    break;
            }            
        }

        // sauvegarde des ordres dans le fichier de la bataille en cours
        storeOrders(battle, armee, ordreRU, nomCase)
    }

    // verification demande appui artillerie
    if (armee == 'fr') {
        const appuiArtillerie = localStorage.getItem("appuiArtillerieFR")
        if (appuiArtillerie) {
            displayArtilleries(armee)            
        } else {
            window.location.replace("attaqueFrontaleFR.html")
        }     
    } else {
        const appuiArtillerie = localStorage.getItem("appuiArtillerieRU")
        if (appuiArtillerie) {
            displayArtilleries(armee)            
        } else {
            window.location.replace("attaqueFrontaleRU.html")
        }     

    }
}

const playTroupes = () => {
    let audio = new Audio("./assets/sounds/ANGLET.WAV")
    // audio.play()
    createBattle()
    let params = getParams()
    console.log(params);
    const armee = params[0][1]
    // delete first row that content armee info
    // params.shift()
    loadGenereauxBattle(params)
    displayTroupes(armee)
}

const playArtilleries = () => {
    let audio = new Audio("./assets/sounds/ANGLET.WAV")
    // audio.play()
    let params = getParams()
    const armee = params[0][1]
    // delete first row that content armee info
    params.shift()
    loadTroupesBattle(params)
    displayArtilleries(armee)
}

const recapAttaque = (scope) => {
    console.log("scope "+scope);
    // sauvegarde des troupes selecionnees pour la charge arriere (page precedente)
    const params = getParams()
    const battle = localStorage.getItem("currentBattle")
    let troupes = []
    let avantage

    // identification des troupes selectionnes
    params.forEach(param => {
        if (param[1] == "on") {
            troupes.push(param[0])
        }
        if (param[0] == "avantage") {
            avantage = param[1]
        }
    })
    
    // recuperation des caracteristiques des troupes et du nombre d unites engagees
    let chargeArriere = getAttaque(troupes, params)
    chargeArriere.forEach(troupe => {
        troupe.charge = "arriere"
        troupe.avantage = parseFloat(avantage)
        storeCharge(battle, troupe)
    });

    // recuperation de la configuration du combat
    let batteleDataFR = getBattleData(battle, 'fr')
    let batteleDataRU = getBattleData(battle, 'au-ru')
    
    displayRecapFR(batteleDataFR);
    
    if (scope == null) {
        displayRecapRU(batteleDataRU);
        console.log("GO!!!!!");
    } 
}

const loadGenereauxBattle = (params) => {
    // get params from previous page
    const selectedGeneraux = params

    const elecdb= require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')


    // record genreaux involved in the battle
    selectedGeneraux.forEach(selectedGeneral => {        
        let where = {
            "nom": selectedGeneral[0]
        }

        if (elecdb.valid('generaux', location)) {         
            elecdb.getRows('generaux', location, where, (succ, data) => {
                if(succ) {
                    data.forEach(general => {                    
                        // get general info
                        const { armee, nom, moral, portrait, id } = general
                        let obj = new Object()

                        obj.armee = armee
                        obj.type = "generaux"
                        obj.nom = nom
                        obj.moral = moral
                        obj.portrait = portrait
                        obj.id = id
                
                        if(elecdb.valid('battle', location)) {
                            elecdb.insertTableContent('battle', location, obj, (succ, msg) => {
                                console.log(`Success: ${succ}`)
                                console.log(`Message: ${msg}`)
                            })
                        }
                    })
                } else {
                    console.log('An error has occured.')
                    console.log(`Message: ${data}`)
                }
            })
        }
    })
}

const loadTroupesBattle = (params) => {
    // get params from previous page
    const selectedTroupes = params

    const elecdb= require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')


    // record troupes involved in the battle
    selectedTroupes.forEach(selectedTroupe => {        
        let where = {
            // replace + between words by a space
            "nom": selectedTroupe[0].split("+").join(" ")
        }

        if (elecdb.valid('troupes', location)) {         
            elecdb.getRows('troupes', location, where, (succ, data) => {
                if(succ) {
                    data.forEach(troupe => {                    
                        // get general info
                        const { armee, nom, de, du, au, tu, id } = troupe
                        let obj = new Object()

                        obj.armee = armee
                        obj.type = "troupes"
                        obj.nom = nom
                        obj.de = de
                        obj.du = du
                        obj.au = au
                        obj.tu = tu
                        obj.id = id
                
                        if(elecdb.valid('battle', location)) {
                            elecdb.insertTableContent('battle', location, obj, (succ, msg) => {
                                console.log(`Success: ${succ}`)
                                console.log(`Message: ${msg}`)
                            })
                        }
                    })
                } else {
                    console.log('An error has occured.')
                    console.log(`Message: ${data}`)
                }
            })
        }
    })
}

const loadArtilleriesBattle = (params) => {
    // get params from previous page
    const selectedArtilleries = params

    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    // record artilleries involved in the battle
    selectedArtilleries.forEach(selectedArtillerie => {  
        let where = {
            // replace + between words by a space
            "nom": selectedArtillerie[0].split("+").join(" ")
        }

        if (elecdb.valid('artilleries', location)) {         
            elecdb.getRows('artilleries', location, where, (succ, data) => {
                if(succ) {
                    data.forEach(artillerie => {                    
                        // get general info
                        const { armee, db, nom, id } = artillerie
                        let obj = new Object()

                        obj.armee = armee
                        obj.type = "artilleries"
                        obj.nom = nom
                        obj.db= db
                        obj.id = id
                
                        if(elecdb.valid('battle', location)) {
                            elecdb.insertTableContent('battle', location, obj, (succ, msg) => {
                                console.log(`Success: ${succ}`)
                                console.log(`Message: ${msg}`)
                            })
                        }
                    })
                } else {
                    console.log('An error has occured.')
                    console.log(`Message: ${data}`)
                }
            })
        }
    })
}

const getBattleData = (battle, armee) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let generaux = []
    let troupes = []
    let artilleries = []
    let ordresArmee = []

    const where = {
        "armee": armee
    }

    if (elecdb.valid(battle, location)) {         
        elecdb.getRows(battle, location, where, (succ, data) => {
            if(succ) {
                data.forEach(element => {  
                    const { type } = element
                    if (type == "generaux") {
                        const { armee, nom, moral, ident } = element
                        generaux.push({armee, nom, moral, ident})
                    }
                    if (type == "troupes") {
                        const { armee, nom, de, du, au, tu, ident, charge, nbUnit, avantage } = element
                        troupes.push({armee, nom, de, du, au, tu, ident, nbUnit, charge, avantage})
                    }
                    if (type == "artilleries") {
                        const { armee, nom, db, ident, distance } = element
                        artilleries.push({armee, nom, db, ident, distance})
                    }
                    if (type == "ordres") {
                        const { armee, ordres, nomCase } = element
                        ordresArmee.push({armee, ordres, nomCase})
                    }
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return {generaux, troupes, artilleries, ordresArmee}
}

const startFight = () => {
    // recupere le nom de indexBataille
    const indexBataille = localStorage.getItem("indexBataille")

    // recupetation des donnees de chaque bataille
    for (let i = 1; i <= indexBataille; i++) {
        let battle = `battle#${i}`

        // recupere les donnees fr
        const armyFR = getBattleData(battle, "fr")

        const generauxFR = armyFR.generaux
        const troupesFR = armyFR.troupes
        const artilleriesFR = armyFR.artilleries
        const ordresFR = armyFR.ordresArmee[0]

        console.log("nomCase: " + ordresFR.nomCase);

        // puissance de feu artillerie FR
        let FeuArtillerieFR = 0
        artilleriesFR.forEach(artillerieFR => {
            FeuArtillerieFR = FeuArtillerieFR + puissanceArtillerie(artillerieFR.db, artillerieFR.distance)
        });
        console.log("feu artillerie FR: " + FeuArtillerieFR);

        // puissance de feu attaque frontale FR
        let FeuFrontalFR = 0
        troupesFR.forEach(troupeFR => {
            if (troupeFR.charge == "frontale") {
                for (let i = 0; i < troupeFR.nbUnit; i++) {
                    FeuFrontalFR = FeuFrontalFR + puissanceFeu(troupeFR.de, troupeFR.du, troupeFR.au, troupeFR.tu)
                }
            }
        });
        console.log("feu frontal FR: " + FeuFrontalFR);
        
        // puissance de feu attaque lateral FR
        let FeuLatralFR = 0
        troupesFR.forEach(troupeFR => {
            if (troupeFR.charge == "laterale") {
                for (let i = 0; i < troupeFR.nbUnit; i++) {
                    FeuLatralFR = FeuLatralFR + puissanceFeu(troupeFR.de, troupeFR.du, troupeFR.au, troupeFR.tu)
                }
            }
        });
        console.log("feu lateral FR: " + FeuLatralFR);
        
        // puissance de feu attaque arriere FR
        let FeuArriereFR = 0
        troupesFR.forEach(troupeFR => {
            if (troupeFR.charge == "arriere") {
                for (let i = 0; i < troupeFR.nbUnit; i++) {
                    FeuArriereFR = FeuArriereFR + puissanceFeu(troupeFR.de, troupeFR.du, troupeFR.au, troupeFR.tu)
                }
            }
        });
        console.log("feu arriere FR: " + FeuArriereFR);

        let puissanceFeuFR = FeuFrontalFR + FeuLatralFR + FeuArriereFR + FeuArtillerieFR


        // recupere les troupes austro-russes engagees dans le combat
        const armyRU = getBattleData(battle, "au-ru")
        const generauxRU = armyRU.generaux
        const troupesRU = armyRU.troupes
        const artilleriesRU = armyRU.artilleries

        // puissance de feu artillerie RU
        let FeuArtillerieRU = 0
        artilleriesRU.forEach(artillerieRU => {
            FeuArtillerieRU = FeuArtillerieRU + puissanceArtillerie(artillerieRU.db, artillerieRU.distance)
        });
        console.log("feu artillerie RU: " + FeuArtillerieRU);

        // puissance de feu attaque frontale RU
        let FeuFrontalRU = 0
        troupesRU.forEach(troupeRU => {
            if (troupeRU.charge == "frontale") {
                for (let i = 0; i < troupeRU.nbUnit; i++) {
                    FeuFrontalRU = FeuFrontalRU + puissanceFeu(troupeRU.de, troupeRU.du, troupeRU.au, troupeRU.tu)
                }
            }
        });
        console.log("feu frontal RU: " + FeuFrontalRU);

        // puissance de feu attaque frontale RU
        let FeuLateralRU = 0
        troupesRU.forEach(troupeRU => {
            if (troupeRU.charge == "laterale") {
                for (let i = 0; i < troupeRU.nbUnit; i++) {
                    FeuLateralRU = FeuLateralRU + puissanceFeu(troupeRU.de, troupeRU.du, troupeRU.au, troupeRU.tu)
                }
            }
        });
        console.log("feu lateral RU: " + FeuLateralRU);

        // puissance de feu attaque arriere RU
        let FeuArriereRU = 0
        troupesRU.forEach(troupeRU => {
            if (troupeRU.charge == "arriere") {
                for (let i = 0; i < troupeRU.nbUnit; i++) {
                    FeuArriereRU = FeuArriereRU + puissanceFeu(troupeRU.de, troupeRU.du, troupeRU.au, troupeRU.tu)
                }
            }
        });
        console.log("feu arriere RU: " + FeuArriereRU);

        let puissanceFeuRU = FeuFrontalRU + FeuLateralRU + FeuArriereRU + FeuArtillerieRU
    
        const resultat = fightCalculation(puissanceFeuFR, puissanceFeuRU)
        if (resultat > 0) {
            console.log("Victoire des Français");
        } else {
            console.log("Victoire des Russes");
        }
    }
}

const puissanceFeu = (de, du, au, tu) => {
    let puissanceFeu = 0
    // calcul des points des dés
    for (let i = 0; i < de; i++) {
        tirage = Math.round(Math.random() * 6)
        puissanceFeu = puissanceFeu + tirage
        // console.log(tirage);
    }
    puissanceFeu = puissanceFeu + du + au
    // console.log("puissance " + puissanceFeu);
    return puissanceFeu
}

const puissanceArtillerie = (db, distance) => {
    let puissanceArtillerie = db / distance
    return puissanceArtillerie
}

const fightCalculation = (FeuFrontalFR, FeuFrontalRU) => {
    return FeuFrontalFR - FeuFrontalRU
}