const electron = require('electron');
const url      = require('url');
const path     = require('path');

const {
  app,
  BrowserWindow,
  Menu
} = electron;
let mainWindow;

// window menu template
const mainMenuTemplate = [{
  label: 'File',
  submenu: [{
    label: 'Quit algebrarium',
    accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
    click() {
      app.quit();
    }
  }]
}];

// dock menu template
const dockMenuTemplate = [{
  // menu items for dock
}];


// listen for app to be ready
app.on('ready', function() {
  // create new window
  mainWindow = new BrowserWindow({});

  // load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  // create application menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  // create dock menu for osx
  if(process.platform == 'darwin') {
    const dockMenu = Menu.buildFromTemplate(dockMenuTemplate);
    app.dock.setMenu(dockMenu);
  }
});
