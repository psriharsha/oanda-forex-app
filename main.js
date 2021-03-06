const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
var fs = require('fs');
var settings = require('./settings');

let win;
let childWindows = [];

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    backgroundColor: '#000000',
    color: '#ffffff',
    'minHeight': 600,
    'minWidth': 900,
    icon: `file://${__dirname}/dist/assets/logo.png`
  })


  win.loadURL(url.format({
    pathname: path.join(__dirname, '/dist/index.html'),
    protocol: 'file:',
    slashes: true,
    hash: '/app'
  }))

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    childWindows.forEach((childWindow) => {
      childWindow.close();
    })
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})


ipcMain.on('openDetail', (event, arg) => {
  let newWin = new BrowserWindow({
    width: 320,
    height: 250,
    backgroundColor: '#000000',
    color: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
  });
  //newWin.setMenu(null);

  newWin.loadURL(url.format({
    pathname: path.join(__dirname, '/dist/index.html'),
    protocol: 'file:',
    slashes: true,
    hash: '/stock/' + arg
  }))
  childWindows.push(newWin);
  newWin.on('closed', function(){
    var index = childWindows.indexOf(newWin);
    childWindows.splice(index, 1);
  })
})

ipcMain.on('closeDetail', (event, arg) => {
  win.webContents.send('addStock', arg);
})

ipcMain.on('login', (event, accountId, token) => {
  settings.apiAccountId = accountId;
  settings.apiToken = token;
  console.log("saved settings");
})

ipcMain.on('getLoginDetails', (event) => {
  console.log("sending " + settings.apiAccountId + "," + settings.apiToken);
  event.sender.send('loginCredentials', settings.apiAccountId, settings.apiToken);
})