const { checkPrime } = require('crypto')

const initApp = () => {
    localStorage.setItem("indexBataille", 0)
    localStorage.setItem("indexCaseCombat", 0)
    displayGnx()
    let indexCombat = parseInt(localStorage.getItem("indexBataille"))
    console.log(indexCombat+10);
}

const loadTroupe = () => {
    displayTroupes("fr")
    displayTroupes("au-ru")
}

const loadArtilleries = () => {
    displayArtilleries("fr")
    displayTroupes("au-ru")
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
                    const { armee, nom, moral, portrait, id } = general
                    generaux.push([nom, moral, portrait, id])
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return generaux
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
                    const { armee, nom, de, du, au, tu } = troupe
                    troupes.push([nom, de, du, au, tu])
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return troupes
}

const getGeneral = (name) => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let general = new Object()
    const where = {
        "nom": name
    }

    if (elecdb.valid('generaux', location)) {         
        elecdb.getRows('generaux', location, where, (succ, data) => {
            if(succ) {
                data.forEach(element => {                        
                    // remplis la table des troupes  
                    const { armee, nom, moral, portrait, id } = element
                    general.armee = armee
                    general.nom = nom
                    general.moral = moral
                    general.portrait = portrait
                    general.id = id
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }
    return general
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
                    const { armee, nom, db } = artillerie
                    artilleries.push([ nom, db ])
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

    // populate french army
    let divGnxFr = document.getElementById("gnxFR")
    // Title
    let titleFr = document.createElement("h3")
    titleFr.textContent = "Français"
    divGnxFr.append(titleFr)
    let listeFr = document.createElement("ul")
    divGnxFr.append(listeFr)
    // display general info
    for (let i = 0; i < generauxFr.length; i++) {
        const general = generauxFr[i]

        // create row
        let item = document.createElement("li")
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", general[0])
        checkbox.setAttribute("name", general[0])
        checkbox.setAttribute("style", "display:none;")
        item.append(checkbox)
        // create col for portait
        let label = document.createElement("label")
        label.setAttribute("for", general[0])
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", `./assets/img/${general[2]}`)
        label.append(portrait)
        let info = document.createElement("p")
        info.textContent = general[0]
        let moral = document.createElement("meter")
        moral.setAttribute("value", general[1])
        info.append(moral)
        label.append(info)
        item.append(label)       
        // add to main page
        listeFr.append(item)
    }
    //add submit button
    // let submitGnxFr = document.createElement("input")
    // submitGnxFr.setAttribute("type", "submit")
    // submitGnxFr.setAttribute("value", "Chargez!!!")
    // divGnxFr.append(submitGnxFr)

    // populate russian army
    let divGnxRU = document.getElementById("gnxRU")
    // Title
    let titleRU = document.createElement("h3")
    titleRU.textContent = "Austro-Russe"
    divGnxRU.append(titleRU)
    let listeRU = document.createElement("ul")
    divGnxRU.append(listeRU)
    // display general info
    for (let i = 0; i < generauxRu.length; i++) {
        const general = generauxRu[i]

        // create row
        let item = document.createElement("li")
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", general[0])
        checkbox.setAttribute("name", general[0])
        checkbox.setAttribute("style", "display:none;")
        item.append(checkbox)
        // create col for portait
        let label = document.createElement("label")
        label.setAttribute("for", general[0])
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", `./assets/img/${general[2]}`)
        label.append(portrait)
        let info = document.createElement("p")
        info.textContent = general[0]
        let moral = document.createElement("meter")
        moral.setAttribute("value", general[1])
        info.append(moral)
        label.append(info)
        item.append(label)       
        // add to main page
        listeRU.append(item)
    }
    //add submit button
    // let submitGnxRu = document.createElement("input")
    // submitGnxRu.setAttribute("type", "submit")
    // submitGnxRu.setAttribute("value", "Chargez!!!")
    // divGnxRU.append(submitGnxRu)
}

const displayTroupes = (armee) => {
    let troupes = getTroupes(armee)

    // populate army
    let divTroupes = document.getElementById("divTroupes")  
    
    let listeTroupes = document.createElement("ul")
    divTroupes.append(listeTroupes)

    // display troupe info
    troupes.forEach(troupe => {
        // create row
        let item = document.createElement("li")
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", troupe[0])
        checkbox.setAttribute("name", troupe[0])
        checkbox.setAttribute("style", "display:none;")
        item.append(checkbox)
        // create col for portait
        let label = document.createElement("label")
        label.setAttribute("for", troupe[0])
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", "./assets/img/troupes.jpg")
        label.append(portrait)
        let info = document.createElement("p")
        info.textContent = troupe[0]
        label.append(info)
        
        label.appendChild(document.createTextNode("Nomre d'unités "))
        let nbUnites = document.createElement("input")
        nbUnites.setAttribute("type", "texte")
        nbUnites.setAttribute("name", troupe[0])
        label.append(nbUnites)
        item.append(label)          
        // add to main page
        listeTroupes.append(item)        
    })
    if (divTroupes.tagName == "FORM") {
        //add submit button
        let submitTroupes = document.createElement("input")
        submitTroupes.setAttribute("type", "submit")
        submitTroupes.setAttribute("value", "Valider")
        divTroupes.append(submitTroupes)
    }
}

const showDistanceTir = (div) => {
    const artillerie = div.getAttribute("id")
    let inputDistance = document.getElementById(artillerie+"Input")
    console.log(inputDistance.getAttribute("style"));
    if (inputDistance.getAttribute("style") == "display: none;") {
        inputDistance.setAttribute("style", "display: block;")        
    } else {
        inputDistance.setAttribute("style", "display: none;")    
    }

    inputDistance.focus()
}

const displayArtilleries = (armee) => {
    let artilleries = getArtilleries(armee)

    // populate army
    let divArtilleries = document.getElementById("divArtilleries")  
    
    let listeArtilleries = document.createElement("ul")
    divArtilleries.append(listeArtilleries)

    // display troupe info
    artilleries.forEach(artillerie => {
        // create row
        let item = document.createElement("li")
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", artillerie[0])
        checkbox.setAttribute("name", artillerie[0])
        checkbox.setAttribute("style", "display:none;")
        item.append(checkbox)
        // create col for portait
        let label = document.createElement("label")
        label.setAttribute("for", artillerie[0])
        label.setAttribute("id", artillerie[0])
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", "./assets/img/artilleries.jpg")
        label.append(portrait)
        let info = document.createElement("p")
        info.textContent = "Salve de " + artillerie[0]
        label.append(info)
        label.setAttribute("onclick", "showDistanceTir(this);")
        
        let labelDistance = document.createTextNode("Distance ")
        // labelDistance.setAttribute("style", "display: none;")
        label.appendChild(labelDistance)
        let distance = document.createElement("input")
        distance.setAttribute("type", "texte")
        distance.setAttribute("id", `${artillerie[0]}Input`)
        distance.setAttribute("name", artillerie[0])
        distance.setAttribute("style", "display: none;")
        label.append(distance)
        
        item.append(label)     

        // add to main page
        listeArtilleries.append(item)
        

    })
    if (divArtilleries.tagName == "FORM") {
        //add submit button
        let submitArtilleries = document.createElement("input")
        submitArtilleries.setAttribute("type", "submit")
        submitArtilleries.setAttribute("value", "Valider")
        divArtilleries.append(submitArtilleries)
    }
}

const displayRecap = (batteleData) => {
    const { generaux, troupes, artilleries} = batteleData
    console.log(generaux);

    let armee = "fr"

    // populate attacker
    // let divAttaque
    // let title
    // if (armee == "fr") {
    //     divAttaque = document.getElementById("attaque")       
    //     // Title
    //     title = document.createElement("h3")
    //     title.textContent = "Attaque françaises"
    // } else {
    //     divAttaque = document.getElementById("attaque")       
    //     // Title
    //     title = document.createElement("h3")
    //     title.textContent = "Attaque austro-russes"
    // }
    // divAttaque.append(title)

    let divAttaque = document.getElementById("attaque")

    // display generaux info
    let titleGnx = document.createElement("h4")
    titleGnx.textContent = "Généraux"
    divAttaque.append(titleGnx)
    let listeGnx = document.createElement("ul")
    divAttaque.append(listeGnx)
    
    generaux.forEach(general => {
        // create row
        console.log(general);        
        let item = document.createElement("li")
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", general[1])
        checkbox.setAttribute("name", general[1])
        checkbox.setAttribute("style", "display:none;")
        item.append(checkbox)
        // create col for portait
        let label = document.createElement("label")
        label.setAttribute("for", general[1])
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", `./assets/img/${general[3]}`)
        label.append(portrait)
        let info = document.createElement("p")
        info.textContent = general[1]
        label.append(info)
        item.append(label)       
        // add to main page
        listeGnx.append(item)        
    })
    divAttaque.append(document.createElement("hr"))

    // display troupes info
    let titleTroupes = document.createElement("h4")
    titleTroupes.textContent = "Troupes"
    divAttaque.append(titleTroupes)
    let listeTroupes = document.createElement("ul")
    divAttaque.append(listeTroupes)
    
    troupes.forEach(troupe => {
        // create row
        console.log(troupe);        
        let item = document.createElement("li")
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", troupe[1])
        checkbox.setAttribute("name", troupe[1])
        checkbox.setAttribute("style", "display:none;")
        item.append(checkbox)
        // create col for portait
        let label = document.createElement("label")
        label.setAttribute("for", troupe[1])
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", "./assets/img/troupes.jpg")
        label.append(portrait)
        let info = document.createElement("p")
        info.textContent = troupe[1]
        label.append(info)
        item.append(label)       
        // add to main page
        listeTroupes.append(item)        
    })
    divAttaque.append(document.createElement("hr"))

    // display artilleries info
    let titleArtilleries = document.createElement("h4")
    titleArtilleries.textContent = "Artilleries"
    divAttaque.append(titleArtilleries)
    let listeArtilleries = document.createElement("ul")
    divAttaque.append(listeArtilleries)
    
    artilleries.forEach(artillerie => {
        // create row
        console.log(artillerie);        
        let item = document.createElement("li")
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", artillerie[1])
        checkbox.setAttribute("name", artillerie[1])
        checkbox.setAttribute("style", "display:none;")
        item.append(checkbox)
        // create col for portait
        let label = document.createElement("label")
        label.setAttribute("for", artillerie[1])
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", "./assets/img/artilleries.jpg")
        label.append(portrait)
        let info = document.createElement("p")
        info.textContent = artillerie[1]
        label.append(info)
        item.append(label)       
        // add to main page
        listeArtilleries.append(item)        
    })
    // if (divTroupes.tagName == "FORM") {
    //     //add submit button
    //     let submitTroupes = document.createElement("input")
    //     submitTroupes.setAttribute("type", "submit")
    //     submitTroupes.setAttribute("value", "Chargez!!!")
    //     divTroupes.append(submitTroupes)
    // }
}