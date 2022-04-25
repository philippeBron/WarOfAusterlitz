const initApp = () => {
    const db = require('electron-db')
    const path = require('path')
    const location = path.join(__dirname, './')
    const selectAnnee = document.getElementById('annee')
    const selectCategorie = document.getElementById('categorie')
    const selectUnitesStrat = document.getElementById('uniteStrat')
    let years = []
    let categories = []
    let unitesStrat = []

    // if (db.valid('troupes', location)) {         
    //     db.getAll('troupes', location, (succ, data) => {
    //         if(succ) {
    //             data.forEach(element => {
    //                 let yearExists = false
    //                 let categorieExists = false
    //                 let uniteStratExists = false

    //                 const { date, categorie, us } = element

    //                 // get every existing years
    //                 if(date !== null) {
    //                     for (let i = 0; i < years.length; i++) {
    //                         if (date === years[i]) {
    //                             yearExists = true
    //                         }
    //                     }
    //                     if (yearExists === false) {
    //                         years.push(date)
    //                     }
    //                 }
    //                 // sort years
    //                 years.sort()
    //                 //reverse years order
    //                 years.reverse()

    //                 // get every existing categories
    //                 if(categorie !== 'Categorie') {
    //                     for (let i = 0; i < categories.length; i++) {
    //                         if (categorie.toLowerCase() === categories[i]) {
    //                             categorieExists = true
    //                         }
    //                     }
    //                     if (categorieExists === false) {
    //                         categories.push(categorie.toLowerCase())
    //                     }
    //                 }
    //                 categories.sort()

    //                 // get every existing stratigraphic units
    //                 if(us !== null) {
    //                     for (let i = 0; i < unitesStrat.length; i++) {
    //                         if (us.toString().toLowerCase() === unitesStrat[i]) {
    //                             uniteStratExists = true
    //                         }
    //                     }
    //                     if (uniteStratExists === false) {
    //                         unitesStrat.push(us.toString().toLowerCase())
    //                     }
    //                 }
    //                 unitesStrat.sort()
    //             })
                    
    //             years.forEach(year => {
    //                 const opt = document.createElement('option')
    //                 opt.value = opt.text = year
    //                 selectAnnee.appendChild(opt)
    //             })
                    
    //             categories.forEach(categorie => {
    //                 const opt = document.createElement('option')
    //                 opt.value = opt.text = categorie
    //                 selectCategorie.appendChild(opt)
    //             })

    //             unitesStrat.forEach(uniteStrat => {
    //                 const opt = document.createElement('option')
    //                 opt.value = opt.text = uniteStrat
    //                 selectUnitesStrat.appendChild(opt)
    //             })
    //         } else {
    //             console.log('An error has occured.')
    //             console.log(`Message: ${data}`)
    //         }
    //     })
    // }
    // document.getElementById('map').style.visibility = "hidden"
    // document.getElementById('dataTable').style.visibility = "hidden"
}