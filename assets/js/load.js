const path = require('path')

const dataLoad = (file) => {
    const readXLsxFile = require('read-excel-file/node')
    const db = require('electron-db')
    const location = path.join(__dirname, './')

    db.createTable('generaux', location, (succ, msg) => {
        console.log("Success: " + succ)
        console.log("Message: " + msg)
    })

    if(db.valid('generaux', location)) {         
        db.clearTable('generaux', location, (succ, msg) => {
            console.log(`Success: ${succ}`)
            console.log(`Message: ${msg}`)
        })
    }

    db.createTable('troupes', location, (succ, msg) => {
        console.log("Success: " + succ)
        console.log("Message: " + msg)
    })

    if(db.valid('troupes', location)) {         
        db.clearTable('troupes', location, (succ, msg) => {
            console.log(`Success: ${succ}`)
            console.log(`Message: ${msg}`)
        })
    }

    db.createTable('artilleries', location, (succ, msg) => {
        console.log("Success: " + succ)
        console.log("Message: " + msg)
    })

    if(db.valid('artilleries', location)) {         
        db.clearTable('artilleries', location, (succ, msg) => {
            console.log(`Success: ${succ}`)
            console.log(`Message: ${msg}`)
        })
    }

    readXLsxFile(file).then((rows) => {
        rows.forEach(element => {
            let obj = new Object()

            obj.armee = element[0]
            obj.ident = element[1]
            obj.nom = element[2]
            if (element[3] == "troupes") {
                obj.de = element[4]
                obj.du = element[5]
                obj.au = element[6]
                obj.tu = element[7]

                console.log(obj)
                
                if(db.valid('troupes', location)) {
                    db.insertTableContent('troupes', location, obj, (succ, msg) => {
                        console.log(`Success: ${succ}`)
                        console.log(`Message: ${msg}`)
                    })
                }
            }
                      
            if (element[3] == "artilleries") {
                obj.db = element[8]

                console.log(obj)
                
                if(db.valid('artilleries', location)) {
                    db.insertTableContent('artilleries', location, obj, (succ, msg) => {
                        console.log(`Success: ${succ}`)
                        console.log(`Message: ${msg}`)
                    })
                }
            }
            if (element[3] == "generaux") {
                obj.moral = element[9]
                obj.portrait = element[10]
                
                console.log(obj)
                
                if(db.valid('generaux', location)) {
                    db.insertTableContent('generaux', location, obj, (succ, msg) => {
                        console.log(`Success: ${succ}`)
                        console.log(`Message: ${msg}`)
                    })
                }
            }
            console.log(obj)
            
            // if(db.valid('troupes', location)) {
            //     db.insertTableContent('troupes', location, obj, (succ, msg) => {
            //         console.log(`Success: ${succ}`)
            //         console.log(`Message: ${msg}`)
            //     })
            // }
        })
        console.log(`Données chargées.`)
        window.close()
    })
}
