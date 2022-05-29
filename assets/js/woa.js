const { checkPrime } = require('crypto')

const initApp = () => {
    localStorage.clear()
    localStorage.setItem("indexBataille", 0)
    localStorage.setItem("indexCaseCombat", 0)
    displayGnx()
}

const loadTroupe = () => {
    displayTroupes("fr")
    displayTroupes("au-ru")
}

const loadArtilleries = () => {
    displayArtilleries("fr")
    displayTroupes("au-ru")
}

// retourne les infrormation d un general
const getGeneral = (ident) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let general = new Object()
    const where = {
        "ident": ident
    }

    if (elecdb.valid('generaux', location)) {         
        elecdb.getRows('generaux', location, where, (succ, data) => {
            if(succ) {
                data.forEach(element => {                        
                    // remplis la table des troupes  
                    const { armee, type, nom, moral, portrait, ident } = element
                    general.armee = armee
                    general.type = "generaux"
                    general.nom = nom
                    general.moral = moral
                    general.portrait = portrait
                    general.ident = ident
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return general
}

// retourne la liste des generaux d une armee
const getGeneraux = (armee) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let generaux = []
    const where = {
        "armee": armee
    }

    if (elecdb.valid('generaux', location)) {         
        elecdb.getRows('generaux', location, where, (succ, data) => {
            if(succ) {
                data.forEach(general => {                    
                    // remplis la table des generaux
                    const { nom, moral, portrait, ident } = general
                    generaux.push([nom, moral, portrait, ident])
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return generaux
}

// retourne les informations d une troupe
const getTroupe = (ident) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let troupe = new Object()
    const where = {
        "ident": ident
    }

    if (elecdb.valid('troupes', location)) {         
        elecdb.getRows('troupes', location, where, (succ, data) => {
            if(succ) {
                data.forEach(element => {                        
                    // remplis la table des troupes  
                    const { armee, nom, de, du, au, tu, ident } = element
                    troupe.armee = armee
                    troupe.type = "troupes"
                    troupe.nom = nom
                    troupe.de = de
                    troupe.du = du
                    troupe.au = au
                    troupe.tu = tu
                    troupe.ident = ident
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return troupe

}

// retourne la liste des troupes d une armee
const getTroupes = (armee) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let troupes = []
    const where = {
        "armee": armee
    }

    if (elecdb.valid('troupes', location)) {         
        elecdb.getRows('troupes', location, where, (succ, data) => {
            if(succ) {
                data.forEach(troupe => {                        
                    // remplis la table des troupes
                    const { armee, nom, de, du, au, tu, ident } = troupe
                    troupes.push([nom, de, du, au, tu, ident])
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return troupes
}

// retourne les informations d une artillerie
const getArtillerie = (ident) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let artillerie = new Object()
    const where = {
        "ident": ident
    }

    if (elecdb.valid('artilleries', location)) {         
        elecdb.getRows('artilleries', location, where, (succ, data) => {
            if(succ) {
                data.forEach(element => {                        
                    // remplis la table des troupes  
                    const { armee, nom, db, ident } = element
                    artillerie.armee = armee
                    artillerie.type = "artilleries"
                    artillerie.nom = nom
                    artillerie.db = db
                    artillerie.ident = ident
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return artillerie

}

// retourne la liste des artilleries
const getArtilleries = (armee) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let artilleries = []
    const where = {
        "armee": armee
    }

    if (elecdb.valid('artilleries', location)) {         
        elecdb.getRows('artilleries', location, where, (succ, data) => {
            if(succ) {
                data.forEach(artillerie => {                    
                    // remplis la table des artilleries
                    const { armee, type, nom, db, ident } = artillerie
                    artilleries.push([ nom, "artilleries", db, ident ])
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return artilleries
}

const displayGnx = () => {
    const generauxFr = getGeneraux("fr")
    const generauxRu = getGeneraux("au-ru")

    // affichage des generaux francais
    let divGnxFr = document.getElementById("gnxFR")

    for (let i = 0; i < generauxFr.length; i++) {
        const general = generauxFr[i]        
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", general[3])
        checkbox.setAttribute("name", general[3])
        divGnxFr.append(checkbox)
        // ajout label du general
        let label = document.createElement("label")
        label.setAttribute("for", general[3])
        label.textContent = general[0]
        let moral = document.createElement("meter")
        moral.setAttribute("value", general[1])
        label.append(moral)
        divGnxFr.append(label)  
        divGnxFr.append(document.createElement("br")) 
    }

    // affichage des generaux austro-russes
    let divGnxRU = document.getElementById("gnxRU")
    
    for (let i = 0; i < generauxRu.length; i++) {
        const general = generauxRu[i]

        // create row
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", general[3])
        checkbox.setAttribute("name", general[3])
        divGnxRU.append(checkbox)
        // ajout label du general
        let label = document.createElement("label")
        label.setAttribute("for", general[3])
        label.textContent = general[0]
        let moral = document.createElement("meter")
        moral.setAttribute("value", general[1])
        label.append(moral)
        divGnxRU.append(label) 
        divGnxRU.append(document.createElement("br"))  
    }
}

const displayTroupes = (armee) => {
    let troupes = getTroupes(armee)

    // affichage des troupes
    let divTroupes = document.getElementById("divTroupes")  
    
    troupes.forEach(troupe => {
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", troupe[5])
        checkbox.setAttribute("name", troupe[5])
        divTroupes.append(checkbox)
        // ajout label de la troupe
        let label = document.createElement("label")
        label.setAttribute("for", troupe[5])
        label.textContent = troupe[0]
        divTroupes.append(label)  
        divTroupes.append(document.createElement("br")) 
         
        // saisie du nombre d'unités engagees
        let nbUnites = document.createTextNode("Nombre d'unités engagées ")
        divTroupes.appendChild(nbUnites)

        let nbUnitesInput = document.createElement("input")
        nbUnitesInput.setAttribute("type", "text")
        nbUnitesInput.setAttribute("id", "nbUnit_" + troupe[5])
        nbUnitesInput.setAttribute("name", "nbUnit_" + troupe[5])
        divTroupes.append(nbUnitesInput)  
        divTroupes.append(document.createElement("hr")) 
    })
}

const displayArtilleries = (armee) => {
    let artilleries = getArtilleries(armee)

    // affichage de l'artillerie
    let divArtilleries = document.getElementById("divArtilleries") 
    
    artilleries.forEach(artillerie => {
        console.log(artillerie);
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", artillerie[3])
        checkbox.setAttribute("name", artillerie[3])
        divArtilleries.append(checkbox)
        // ajout label de l artillerie
        let label = document.createElement("label")
        label.setAttribute("for", artillerie[3])
        label.textContent = " Salve de " + artillerie[0]
        divArtilleries.append(label)  
        divArtilleries.append(document.createElement("br")) 
         
        // saisie de la distance de tir
        let distance = document.createTextNode("Distance de tir ")
        divArtilleries.appendChild(distance)

        let distanceInput = document.createElement("input")
        distanceInput.setAttribute("type", "text")
        distanceInput.setAttribute("id", "dist_" + artillerie[3])
        distanceInput.setAttribute("name", "dist_" + artillerie[3])
        divArtilleries.append(distanceInput)  
        divArtilleries.append(document.createElement("hr")) 



        // let labelDistance = document.createTextNode("Distance ")
        // // labelDistance.setAttribute("style", "display: none;")
        // label.appendChild(labelDistance)
        // let distance = document.createElement("input")
        // distance.setAttribute("type", "texte")
        // distance.setAttribute("id", `${artillerie[0]}Input`)
        // distance.setAttribute("name", artillerie[0])
        // distance.setAttribute("style", "display: none;")
        // label.append(distance)
        
        // item.append(label)     

        // // add to main page
        // listeArtilleries.append(item)
        

    })
    if (divArtilleries.tagName == "FORM") {
        //add submit button
        let submitArtilleries = document.createElement("input")
        submitArtilleries.setAttribute("type", "submit")
        submitArtilleries.setAttribute("value", "Valider")
        divArtilleries.append(submitArtilleries)
    }
}

const displayRecapFR = (batteleDataFR) => {
    console.log(batteleDataFR);
    const { generaux, troupes, artilleries, ordresArmee} = batteleDataFR
    const generauxFR = generaux
    const troupesFR = troupes
    const artilleriesFR = artilleries
    const ordresFR = ordresArmee

    let chargeFrontale = []
    let chargeLaterale = []
    let chargeArriere = []

    // repartition des troupes en fonction de la direction de la charge (frontale, lateral ou arriere)
    troupesFR.forEach(troupe => {
        switch (troupe.charge) {
            case "frontale":
                chargeFrontale.push(troupe)
                break
            case "laterale":
                chargeLaterale.push(troupe)
                break
            case "arriere":
                chargeArriere.push(troupe)
                break
            default:
                break;
        }
    });

    let divFrance = document.getElementById("france")

    // affiche les generaux engages
    let titleGnx = document.createElement("h4")
    titleGnx.textContent = "Généraux français"
    divFrance.append(titleGnx)
    if (generauxFR.length > 0) {
        let listeGnx = document.createElement("ul")
        divFrance.append(listeGnx)
        
        generauxFR.forEach(general => {
            let item = document.createElement("li")
            item.textContent = general.nom
            listeGnx.append(item)        
        })
    } else {
        divFrance.append(document.createElement("p").textContent = "Pas de généraux français engagés dans l'attaque.")
    }
    divFrance.append(document.createElement("hr"))

    // afiche les ordres francais
    let titleOrdres = document.createElement("h4")
    titleOrdres.textContent = `Ordres : ${ordresFR[0].ordres}`
    divFrance.append(titleOrdres)

    divFrance.append(document.createElement("hr"))

    // affiche les tirs d'artillerie
    let titleArtilleries = document.createElement("h4")
    titleArtilleries.textContent = "Tirs d'artilleries"
    divFrance.append(titleArtilleries)
    if (artilleriesFR.length > 0) {
        let listeArtilleries = document.createElement("ul")
        divFrance.append(listeArtilleries)
        
        artilleriesFR.forEach(artillerie => {
            let item = document.createElement("li")
            item.textContent = "Salve de " + artillerie.nom + " à " + artillerie.distance + " case(s)."
            listeArtilleries.append(item)        
        })
    } else {
        divFrance.append(document.createElement("p").textContent = "Pas d'appui de l'artillerie française.")
    }
    divFrance.append(document.createElement("hr"))

    // affiche la charge frontale
    let titleChargeFrontale = document.createElement("h4")
    titleChargeFrontale.textContent = "Charge Frontale"
    divFrance.append(titleChargeFrontale) 
    
    if (chargeFrontale.length > 0) {
        // verification de la presence d'un avantage terrain
        if (chargeFrontale[0].avantage != "") {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Avantage terrain de " + chargeFrontale[0].avantage
            divFrance.append(titleAvantage)
        } else {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Pas d'avantage terrain"
            divFrance.append(titleAvantage)
        }
    
        let listeTroupesFrontale = document.createElement("ul")
        divFrance.append(listeTroupesFrontale) 
        
        chargeFrontale.forEach(troupe => {
            console.log(troupe);       
            let item = document.createElement("li")
            item.textContent = troupe.nom + " : " + troupe.nbUnit + " unité(s)."
            listeTroupesFrontale.append(item)        
        })
    } else {
        divFrance.append(document.createElement("p").textContent = "Pas de charge frontale française.")
    }
    divFrance.append(document.createElement("hr"))

    // affiche la charge laterale
    let titleChargeLaterale = document.createElement("h4")
    titleChargeLaterale.textContent = "Charge Latérale"
    divFrance.append(titleChargeLaterale)
    
    if (chargeLaterale.length > 0) {
        // verification de la presence d'un avantage terrain
        if (chargeLaterale[0].avantage != null) {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Avantage terrain de " + chargeLaterale[0].avantage
            divFrance.append(titleAvantage)
        } else {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Pas d'avantage terrain"
            divFrance.append(titleAvantage)
        }
    
        let listeTroupesLaterale = document.createElement("ul")
        divFrance.append(listeTroupesLaterale)  
        
        chargeLaterale.forEach(troupe => {
            console.log(troupe);       
            let item = document.createElement("li")
            item.textContent = troupe.nom + " : " + troupe.nbUnit + " unité(s)."
            listeTroupesLaterale.append(item)        
        })
    } else {
        divFrance.append(document.createElement("p").textContent = "Pas de charge latérale française.")
    }
    divFrance.append(document.createElement("hr"))

    // affiche la charge arriere
    let titleChargeArriere = document.createElement("h4")
    titleChargeArriere.textContent = "Charge Arrière"
    divFrance.append(titleChargeArriere)
    
    if (chargeArriere.length > 0) {
        // verification de la presence d'un avantage terrain
        if (chargeArriere[0].avantage != null) {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Avantage terrain de " + chargeArriere[0].avantage
            divFrance.append(titleAvantage)
        } else {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Pas d'avantage terrain"
            divFrance.append(titleAvantage)
        }
    
        let listeTroupesArriere = document.createElement("ul")
        divFrance.append(listeTroupesArriere)  
        
        chargeArriere.forEach(troupe => {
            console.log(troupe);       
            let item = document.createElement("li")
            item.textContent = troupe.nom + " : " + troupe.nbUnit + " unité(s)."
            listeTroupesArriere.append(item)        
        })        
    } else {
        divFrance.append(document.createElement("p").textContent = "Pas de charge arrière française.")
    }
}

const displayRecapRU = (batteleDataRU) => {
    console.log(batteleDataRU);
    const { generaux, troupes, artilleries, ordresArmee} = batteleDataRU
    const generauxRU = generaux
    const troupesRU = troupes
    const artilleriesRU = artilleries
    const ordresRU = ordresArmee

    console.log(ordresRU);

    let chargeFrontale = []
    let chargeLaterale = []
    let chargeArriere = []

    // repartition des troupes en fonction de la direction de la charge (frontale, lateral ou arriere)
    troupesRU.forEach(troupe => {
        switch (troupe.charge) {
            case "frontale":
                chargeFrontale.push(troupe)
                break
            case "laterale":
                chargeLaterale.push(troupe)
                break
            case "arriere":
                chargeArriere.push(troupe)
                break
            default:
                break;
        }
    });

    let divRU = document.getElementById("russe")

    // affiche les generaux engages
    let titleGnx = document.createElement("h4")
    titleGnx.textContent = "Généraux austro-russes"
    divRU.append(titleGnx)
    if (generauxRU.length > 0) {
        let listeGnx = document.createElement("ul")
        divRU.append(listeGnx)
        
        generauxRU.forEach(general => {
            let item = document.createElement("li")
            item.textContent = general.nom
            listeGnx.append(item)        
        })
    }  else {
        divRU.append(document.createElement("p").textContent = "Pas de généraux austro-russes engagés dans l'attaque.")
    }
    divRU.append(document.createElement("hr"))

    // afiche les ordres russes
    let titleOrdres = document.createElement("h4")
    titleOrdres.textContent = `Ordres : ${ordresRU[0].ordres}`
    divRU.append(titleOrdres)

    divRU.append(document.createElement("hr"))
    
    // affiche les tirs d'artillerie
    let titleArtilleries = document.createElement("h4")
    titleArtilleries.textContent = "Tirs d'artilleries"
    divRU.append(titleArtilleries)
    if (artilleriesRU.length > 0) {
        let listeArtilleries = document.createElement("ul")
        divRU.append(listeArtilleries)
        
        artilleriesRU.forEach(artillerie => {
            let item = document.createElement("li")
            item.textContent = "Salve de " + artillerie.nom + " à " + artillerie.distance + " case(s)."
            listeArtilleries.append(item)        
        })
    } else {
        divRU.append(document.createElement("p").textContent = "Pas d'appui de l'artillerie austro-russe.")
    }

    divRU.append(document.createElement("hr"))        

    // affiche la charge frontale
    let titleChargeFrontale = document.createElement("h4")
    titleChargeFrontale.textContent = "Charge Frontale"
    divRU.append(titleChargeFrontale) 
    
    if (chargeFrontale.length > 0) {
        // verification de la presence d'un avantage terrain
        if (chargeFrontale[0].avantage != null) {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Avantage terrain de " + chargeFrontale[0].avantage
            divRU.append(titleAvantage)
        } else {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Pas d'avantage terrain"
            divRU.append(titleAvantage)
        }
    
        let listeTroupesFrontale = document.createElement("ul")
        divRU.append(listeTroupesFrontale) 
        
        chargeFrontale.forEach(troupe => {
            console.log(troupe);       
            let item = document.createElement("li")
            item.textContent = troupe.nom + " : " + troupe.nbUnit + " unité(s)."
            listeTroupesFrontale.append(item)        
        })
    } else {
        divRU.append(document.createElement("p").textContent = "Pas de charge frontale austro-russe.")
    }
    divRU.append(document.createElement("hr"))        

    // affiche la charge laterale
    let titleChargeLaterale = document.createElement("h4")
    titleChargeLaterale.textContent = "Charge Latérale"
    divRU.append(titleChargeLaterale)
    
    if (chargeLaterale.length > 0) {
        // verification de la presence d'un avantage terrain
        if (chargeLaterale[0].avantage != null) {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Avantage terrain de " + chargeLaterale[0].avantage
            divRU.append(titleAvantage)
        } else {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Pas d'avantage terrain"
            divRU.append(titleAvantage)
        }
    
        let listeTroupesLaterale = document.createElement("ul")
        divRU.append(listeTroupesLaterale)  
        
        chargeLaterale.forEach(troupe => {
            console.log(troupe);       
            let item = document.createElement("li")
            item.textContent = troupe.nom + " : " + troupe.nbUnit + " unité(s)."
            listeTroupesLaterale.append(item)        
        })
    } else {
        divRU.append(document.createElement("p").textContent = "Pas de charge latérale austro-russe.")
    }
    divRU.append(document.createElement("hr"))        

    // affiche la charge arriere
    let titleChargeArriere = document.createElement("h4")
    titleChargeArriere.textContent = "Charge Arrière"
    divRU.append(titleChargeArriere)
    
    if (chargeArriere.length > 0) {
        // verification de la presence d'un avantage terrain
        if (chargeArriere[0].avantage != null) {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Avantage terrain de " + chargeArriere[0].avantage
            divRU.append(titleAvantage)
        } else {
            let titleAvantage = document.createElement("h5")
            titleAvantage.textContent = "Pas d'avantage terrain"
            divRU.append(titleAvantage)
        }
        
        let listeTroupesArriere = document.createElement("ul")
        divRU.append(listeTroupesArriere)  
        
        chargeArriere.forEach(troupe => {
            console.log(troupe);       
            let item = document.createElement("li")
            item.textContent = troupe.nom + " : " + troupe.nbUnit + " unité(s)."
            listeTroupesArriere.append(item)        
        })
    } else {
        divRU.append(document.createElement("p").textContent = "Pas de charge arrière austro-russe.")
    }
}