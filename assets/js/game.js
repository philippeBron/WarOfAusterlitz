const playTroupes = () => {
    let audio = new Audio("./assets/sounds/ANGLET.WAV")
    audio.play()
    createBattle()
    let params = getParams()
    console.log(params);
    const armee = params[0][1]
    // delete first row that content armee info
    params.shift()
    loadGenereauxBattle(params)
    displayTroupes(armee)
}

const playArtilleries = () => {
    let audio = new Audio("./assets/sounds/ANGLET.WAV")
    audio.play()
    let params = getParams()
    const armee = params[0][1]
    // delete first row that content armee info
    params.shift()
    loadTroupesBattle(params)
    displayArtilleries(armee)
}

const recapAttaque = () => {
    let audio = new Audio("./assets/sounds/FRANCE.WAV")
    audio.play()
    let params = getParams()
    const armee = params[0][1]
    // delete first row that content armee info
    params.shift()
    loadArtilleriesBattle(params)
    batteleData = getBattleData()
    displayRecap(batteleData);
}

const createBattle = () => {
    const elecdb= require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    // create and clean battle data
    elecdb.createTable('battle', location, (succ, msg) => {
        console.log("Success: " + succ)
        console.log("Message: " + msg)
    })

    if(elecdb.valid('battle', location)) {         
        elecdb.clearTable('battle', location, (succ, msg) => {
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

const getBattleData = () => {
    const elecdb = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')

    let generaux = []
    let troupes = []
    let artilleries = []

    if (elecdb.valid('battle', location)) {         
        elecdb.getAll('battle', location, (succ, data) => {
            if(succ) {
                data.forEach(element => {  
                    const { type } = element
                    if (type == "generaux") {
                        const { armee, nom, moral, portrait } = element
                        generaux.push([armee, nom, moral, portrait])
                    }
                    if (type == "troupes") {
                        const { armee, nom, de, du, au, tu } = element
                        troupes.push([armee, nom, de, du, au, tu])
                    }
                    if (type == "artilleries") {
                        const { armee, nom, db } = element
                        artilleries.push([armee, nom, db])
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