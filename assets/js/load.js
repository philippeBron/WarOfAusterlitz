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
            obj.nom = element[1]
            if (element[2] == "troupe") {
                obj.de = element[3]
                obj.du = element[4]
                obj.au = element[5]
                obj.tu = element[6]

                console.log(obj)
                
                if(db.valid('troupes', location)) {
                    db.insertTableContent('troupes', location, obj, (succ, msg) => {
                        console.log(`Success: ${succ}`)
                        console.log(`Message: ${msg}`)
                    })
                }
            }
                      
            if (element[2] == "artillerie") {
                obj.db = element[7]

                console.log(obj)
                
                if(db.valid('artilleries', location)) {
                    db.insertTableContent('artilleries', location, obj, (succ, msg) => {
                        console.log(`Success: ${succ}`)
                        console.log(`Message: ${msg}`)
                    })
                }
            }
            if (element[2] == "generaux") {
                obj.moral = element[8]
                obj.portrait = element[9]
                
                console.log(obj)
                
                if(db.valid('generaux', location)) {
                    db.insertTableContent('generaux', location, obj, (succ, msg) => {
                        console.log(`Success: ${succ}`)
                        console.log(`Message: ${msg}`)
                    })
                }
            }
            // console.log(obj)
            
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
