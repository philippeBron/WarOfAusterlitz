const initApp = () => {
    const db = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let generauxFr = []
    let generauxRu = []
    let troupesFr = []
    let troupesRu = []

    if (db.valid('troupes', location)) {         
        db.getAll('troupes', location, (succ, data) => {
            if(succ) {
                data.forEach(element => {                    
                    // get and sort all generaux
                    if(element.type == 'generaux') {
                        const { armee, nom, moral, portrait } = element
                        if(armee == "fr") {
                            generauxFr.push([nom, moral, portrait])
                        } else {
                            generauxRu.push([nom, moral, portrait])
                        }
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
    displayGnx(generauxFr, generauxRu)
}

const displayGnx = (generauxFr, generauxRu) => {
    // populate french army
    let divGnxFr = document.getElementById("gnxFR")
    // Title
    let titleFr = document.createElement("h3")
    titleFr.textContent = "Français"
    divGnxFr.append(titleFr)
    // display general info
    for (let i = 0; i < generauxFr.length; i++) {
        const general = generauxFr[i]

        // create row
        let divRow = document.createElement("div")
        divRow.setAttribute("class", "row")
        // create col for portait
        let divColPic = document.createElement("div")
        divColPic.setAttribute("class", "col-sm-2")
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", `./assets/img/${general[2]}`)
        divColPic.append(portrait)
        divRow.append(divColPic)
        // create col for name and moral
        let divColName = document.createElement("div")
        divColName.setAttribute("class", "col-sm-6")
        let name = document.createElement("h4")
        let moral = document.createElement("meter")
        name.textContent = general[0]
        moral.setAttribute("value", general[1])
        divColName.append(name)
        divColName.append(moral)
        divRow.append(divColName)
        // add to main page
        divGnxFr.append(divRow)
    }

    // populate russian army
    let divGnxRU = document.getElementById("gnxRU")
    // Title
    let titleRU = document.createElement("h3")
    titleRU.textContent = "Austro-Russe"
    divGnxRU.append(titleRU)
    // display general info
    for (let i = 0; i < generauxRu.length; i++) {
        const general = generauxRu[i]

        // create row
        let divRow = document.createElement("div")
        divRow.setAttribute("class", "row")
        // create col for portait
        let divColPic = document.createElement("div")
        divColPic.setAttribute("class", "col-sm-2")
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", `./assets/img/${general[2]}`)
        divColPic.append(portrait)
        divRow.append(divColPic)
        // create col for name and moral
        let divColName = document.createElement("div")
        divColName.setAttribute("class", "col-sm-6")
        let name = document.createElement("h4")
        let moral = document.createElement("meter")
        name.textContent = general[0]
        moral.setAttribute("value", general[1])
        divColName.append(name)
        divColName.append(moral)
        divRow.append(divColName)
        // add to main page
        divGnxRU.append(divRow)
    }
}

const displayTroupes = () => {
    const db = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let troupesFr = []
    let troupesRu = []

    if (db.valid('troupes', location)) {         
        db.getAll('troupes', location, (succ, data) => {
            if(succ) {
                data.forEach(element => {                    
                    // get and sort all troupes
                    if(element.type == 'troupe') {
                        const { armee, nom, de, du, au, tu } = element
                        if(armee == "fr") {
                            troupesFr.push([nom, de, du, au, tu])
                        } else {
                            troupesRu.push([nom, de, du, au, tu])
                        }
                    }
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
            console.log(troupesFr)
            console.log(troupesRu)
        })
    }

    // populate french army
    let divtroupesFR = document.getElementById("troupesFR")
    // Title
    let titleFr = document.createElement("h3")
    titleFr.textContent = "Françaises"
    divtroupesFR.append(titleFr)
    // display troupe info
    for (let i = 0; i < troupesFr.length; i++) {
        const troupe = troupesFr[i]

        // create row
        let divRow = document.createElement("div")
        divRow.setAttribute("class", "row")
        // create col for image
        let divColPic = document.createElement("div")
        divColPic.setAttribute("class", "col-sm-2")
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", `./assets/img/troupes.jpg`)
        divColPic.append(portrait)
        divRow.append(divColPic)
        // create col for name and moral
        let divColName = document.createElement("div")
        divColName.setAttribute("class", "col-sm-6")
        let name = document.createElement("h4")
        let properties = document.createElement("ul")
        let de = document.createElement("li")
        let du = document.createElement("li")
        let au = document.createElement("li")
        let tu = document.createElement("li")
        name.textContent = troupe[0]
        de.textContent = `de = ${troupe[1]}`
        properties.append(de)
        du.textContent = `du = ${troupe[2]}`
        properties.append(du)
        au.textContent = `au = ${troupe[3]}`
        properties.append(au)
        tu.textContent = `tu = ${troupe[4]}`
        properties.append(tu)
        divColName.append(name)
        divColName.append(properties)
        divRow.append(divColName)
        // add to main page
        divtroupesFR.append(divRow)
    }

    // populate russian army
    let divtroupesRU = document.getElementById("troupesRU")
    // Title
    let titleRU = document.createElement("h3")
    titleRU.textContent = "Austro-Russes"
    divtroupesRU.append(titleRU)
    // display troupe info
    for (let i = 0; i < troupesRu.length; i++) {
        const troupe = troupesRu[i]

        // create row
        let divRow = document.createElement("div")
        divRow.setAttribute("class", "row")
        // create col for image
        let divColPic = document.createElement("div")
        divColPic.setAttribute("class", "col-sm-2")
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", `./assets/img/troupes.jpg`)
        divColPic.append(portrait)
        divRow.append(divColPic)
        // create col for name and moral
        let divColName = document.createElement("div")
        divColName.setAttribute("class", "col-sm-6")
        let name = document.createElement("h4")
        let properties = document.createElement("ul")
        let de = document.createElement("li")
        let du = document.createElement("li")
        let au = document.createElement("li")
        let tu = document.createElement("li")
        name.textContent = troupe[0]
        de.textContent = `de = ${troupe[1]}`
        properties.append(de)
        du.textContent = `du = ${troupe[2]}`
        properties.append(du)
        au.textContent = `au = ${troupe[3]}`
        properties.append(au)
        tu.textContent = `tu = ${troupe[4]}`
        properties.append(tu)
        divColName.append(name)
        divColName.append(properties)
        divRow.append(divColName)
        // add to main page
        divtroupesRU.append(divRow)
    }
}

const displayArtilleries = () => {
    const db = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let artillerieFr = []
    let artillerieRu = []

    if (db.valid('troupes', location)) {         
        db.getAll('troupes', location, (succ, data) => {
            if(succ) {
                data.forEach(element => {                    
                    // get and sort all troupes
                    if(element.type == 'artillerie') {
                        const { armee, nom, db } = element
                        if(armee == "fr") {
                            artillerieFr.push([nom, db ])
                        } else {
                            artillerieRu.push([nom, db ])
                        }
                    }
                })
            } else {
                console.log('An error has occured.')
                console.log(`Message: ${data}`)
            }
            console.log(artillerieFr)
            console.log(artillerieRu)
        })
    }

    // populate french army
    let divArtillerieFR = document.getElementById("artillerieFR")
    // Title
    let titleFr = document.createElement("h3")
    titleFr.textContent = "Françaises"
    divArtillerieFR.append(titleFr)
    // display troupe info
    for (let i = 0; i < artillerieFr.length; i++) {
        const artillerie = artillerieFr[i]

        // create row
        let divRow = document.createElement("div")
        divRow.setAttribute("class", "row")
        // create col for image
        let divColPic = document.createElement("div")
        divColPic.setAttribute("class", "col-sm-2")
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", `./assets/img/troupes.jpg`)
        divColPic.append(portrait)
        divRow.append(divColPic)
        // create col for name and moral
        let divColName = document.createElement("div")
        divColName.setAttribute("class", "col-sm-6")
        let name = document.createElement("h4")
        let properties = document.createElement("ul")
        let db = document.createElement("li")
        name.textContent = artillerie[0]
        db.textContent = `db = ${artillerie[1]}`
        properties.append(db)
        divColName.append(name)
        divColName.append(properties)
        divRow.append(divColName)
        // add to main page
        divArtillerieFR.append(divRow)
    }

    // populate russian army
    let divArtillerieRU = document.getElementById("artillerieRU")
    // Title
    let titleRU = document.createElement("h3")
    titleRU.textContent = "Austro-Russes"
    divArtillerieRU.append(titleRU)
    // display troupe info
    for (let i = 0; i < artillerieRu.length; i++) {
        const artillerie = artillerieRu[i]

        // create row
        let divRow = document.createElement("div")
        divRow.setAttribute("class", "row")
        // create col for image
        let divColPic = document.createElement("div")
        divColPic.setAttribute("class", "col-sm-2")
        let portrait = document.createElement("img")
        portrait.setAttribute("width", "80px")
        portrait.setAttribute("src", `./assets/img/troupes.jpg`)
        divColPic.append(portrait)
        divRow.append(divColPic)
        // create col for name and moral
        let divColName = document.createElement("div")
        divColName.setAttribute("class", "col-sm-6")
        let name = document.createElement("h4")
        let properties = document.createElement("ul")
        let db = document.createElement("li")
        name.textContent = artillerie[0]
        db.textContent = `db = ${artillerie[1]}`
        properties.append(db)
        divColName.append(name)
        divColName.append(properties)
        divRow.append(divColName)
        // add to main page
        divArtillerieRU.append(divRow)
    }
}