const { checkPrime } = require('crypto')

const loadTroupe = () => {
    displayTroupes("fr")
    displayTroupes("au-ru")
}

const loadArtilleries = () => {
    displayArtilleries("fr")
    displayTroupes("au-ru")
}

const displayGnx = () => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let generauxFr = []
    let generauxRu = []

    if (elecdb.valid('generaux', location)) {         
        elecdb.getAll('generaux', location, (succ, data) => {
            if(succ) {
                data.forEach(element => {                    
                    // get and sort all generaux
                    const { armee, nom, moral, portrait, id } = element
                    if(armee == "fr") {
                        generauxFr.push([nom, moral, portrait, id])
                    } else {
                        generauxRu.push([nom, moral, portrait, id])
                    }   
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
            // console.log(generauxFr)
            // console.log(generauxRu)
        })
    }

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
    let submitGnxFr = document.createElement("input")
    submitGnxFr.setAttribute("type", "submit")
    submitGnxFr.setAttribute("value", "Chargez!!!")
    divGnxFr.append(submitGnxFr)

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
    let submitGnxRu = document.createElement("input")
    submitGnxRu.setAttribute("type", "submit")
    submitGnxRu.setAttribute("value", "Chargez!!!")
    divGnxRU.append(submitGnxRu)
}

const displayTroupes = (armee) => {
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
                    // get and sort all troupes
                    const { armee, nom, de, du, au, tu } = troupe
                    troupes.push([nom, de, du, au, tu])
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }

    // populate army
    let divTroupes
    let title
    if (armee == "fr") {
        divTroupes = document.getElementById("troupesFR")       
        // Title
        title = document.createElement("h3")
        title.textContent = "Françaises"
    } else {
        divTroupes = document.getElementById("troupesRU")       
        // Title
        title = document.createElement("h3")
        title.textContent = "Austro-Russes"
    }
    divTroupes.append(title)
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
        item.append(label)       
        // add to main page
        listeTroupes.append(item)        
    })
    if (divTroupes.tagName == "FORM") {
        //add submit button
        let submitTroupes = document.createElement("input")
        submitTroupes.setAttribute("type", "submit")
        submitTroupes.setAttribute("value", "A l'attaque!!!")
        divTroupes.append(submitTroupes)
    }
}

const displayArtilleries = (armee) => {
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
                    // get artilleries
                    const { armee, nom, db } = artillerie
                    artilleries.push([ nom, db ])
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
        })
    }

    // populate army
    let divArtilleries
    let title
    if (armee == "fr") {
        divArtilleries = document.getElementById("artilleriesFR")       
        // Title
        title = document.createElement("h3")
        title.textContent = "Françaises"
    } else {
        divArtilleries = document.getElementById("artilleriesRU")       
        // Title
        title = document.createElement("h3")
        title.textContent = "Austro-Russes"
    }
    divArtilleries.append(title)
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
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", "./assets/img/artilleries.jpg")
        label.append(portrait)
        let info = document.createElement("p")
        info.textContent = artillerie[0]
        label.append(info)
        item.append(label)       
        // add to main page
        listeArtilleries.append(item)        
    })
    if (divArtilleries.tagName == "FORM") {
        //add submit button
        let submitArtilleries = document.createElement("input")
        submitArtilleries.setAttribute("type", "submit")
        submitArtilleries.setAttribute("value", "A l'attaque!!!")
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