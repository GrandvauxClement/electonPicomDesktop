const {ipcMain} = require('electron')
const path = require('path')
const commonService = require('../services/CommonService')

class DashboardHomeCommunication {
    init() {

        ipcMain.on('admin-dashboard', (eHome, data) => {
            const viewPath = path.join(__dirname, 'views', 'dashboard', 'home.html')
            const win = commonService.createWindow(viewPath, 1000, 500)

            /*ipcMain.handle('new-item', (e, newItem) => {
                const arrayToAd = data.type === 'profit' ? dataStore.profits : dataStore.expenses

                newItem.id = arrayToAd.length > 0 ? arrayToAd[arrayToAd.length - 1].id + 1 : 1

                data.type === 'profit' ? dataStore.profits.push(newItem) : dataStore.expenses.push(newItem)

                eHome.reply('new-item-added', {
                    type: data.type,
                    /!*profits: dataStore.profits,
                    expenses: dataStore.expenses,*!/
                    newItem
                })
                return "L'item a correctement été ajouté"
            })*/

            win.on('closed', () => {
                console.log("Fermeture de la fenetre pour new item", data.type)
                ipcMain.removeHandler('new-item')
            })
        })
    }
}

module.exports = new DashboardHomeCommunication()
