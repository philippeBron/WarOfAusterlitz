const path = require('path')

const dataLoad = (file) => {
    const readXLsxFile = require('read-excel-file/node')
    const db = require('electron-db')

    const location = path.join(__dirname, './')
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

    readXLsxFile(file).then((rows) => {
        rows.forEach(element => {
            let obj = new Object()

            obj.armee = element[0]
            obj.nom = element[1]
            obj.type = element[2]
            if (element[2] == "troupe") {
                obj.de = element[3]
                obj.du = element[4]
                obj.au = element[5]
                obj.tu = element[6]
            }
                      
            if (element[2] == "artillerie") {
                obj.db = element[7]
            }
            if (element[2] == "generaux") {
                obj.moral = element[8]
                obj.portrait = element[9]
            }
            console.log(obj)
            
            if(db.valid('troupes', location)) {
                db.insertTableContent('troupes', location, obj, (succ, msg) => {
                    console.log(`Success: ${succ}`)
                    console.log(`Message: ${msg}`)
                })
            }
        })
        console.log(`Données chargées.`)
        window.close()
    })
}
