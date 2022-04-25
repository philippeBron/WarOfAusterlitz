const initApp = () => {
    const db = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')
    const selectAnnee = document.getElementById('annee')
    const selectCategorie = document.getElementById('categorie')
    const selectUnitesStrat = document.getElementById('uniteStrat')

    let generauxFr = []
    let generauxRu = []

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
            console.log(generauxFr)
            console.log(generauxRu)
        })
    }
    displayGnx(generauxFr, generauxRu)
    // document.getElementById('map').style.visibility = "hidden"
    // document.getElementById('dataTable').style.visibility = "hidden"
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