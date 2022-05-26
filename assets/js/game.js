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
    const indexBataille = localStorage.getItem("indexBataille")

    // creation et stockage du nom de la bataille en cours
    const currentBattle = `battle#${indexBataille}`
    localStorage.setItem("currentBattle", currentBattle)

    // creation de la base pour la nouvelle bataille
    createBattle(currentBattle)

    // recupere les noms des generaux selectionnes pour la zone de combat (page precedente)
    const selectedGeneraux = getParams()
    let titleText = "Quels sont les ordres de"
    for (let index = 0; index < selectedGeneraux.length; index++) {
        const general = getGeneral(selectedGeneraux[index][0])
        if (general.armee == 'fr') {
            titleText = titleText + " / " + general.nom
        }
        storeGeneral(currentBattle, general)
    }
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

    // affichage des troupes pour selections de la charge frontale
    displayTroupes(armee)
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

    // affichage des troupes pour selections de la charge laterale
    displayTroupes(armee)
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

    // affichage des troupes pour selections de la charge laterale
    displayTroupes(armee)
}

const appuiArtillerie = (armee) => {
    console.log(getParams());
    // le nom de la case de combat est défini en meme temps que les ordres francais
    if (armee == 'fr') {
        const nomCase = getParams()[0][1]
        const ordreFR = getParams()[1][1]

        // sauvegarde le nom de la case et l'ordre
        localStorage.setItem("nomCase", nomCase)
        localStorage.setItem("ordreFR", ordreFR)
    }
    else{
        const ordreRU = getParams()[0][1]

        // sauvegarde le nom de la case et l'ordre
        localStorage.setItem("ordreRU", ordreRU)
    }

    displayArtilleries(armee)
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
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return {generaux, troupes, artilleries}
}

