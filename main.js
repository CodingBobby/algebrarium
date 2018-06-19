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

// fix emty menu on windows
if(process.platform == 'darwin')
  mainMenuTemplate.unshift({});

if(process.env.NODE_ENV !== 'production')
  mainMenuTemplate.push({
    label: 'Dev Tools',
    submenu: [{
      label: 'Toggle Dev Tools',
      accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
      click(item, focusedWindow){
        focusedWindow.toggleDevTools();
      }
    },{
      label: 'Reload App',
      accelerator: process.platform == 'darwin' ? 'Command+R' : 'Ctrl+R',
      role: 'reload'
    }]
  });

// dock menu template
const dockMenuTemplate = [{
  // menu items for dock
}];


// listen for app to be ready
app.on('ready', function() {
  // create new window
  mainWindow = new BrowserWindow({
    width: 800,
    height: process.platform == 'darwin' ? 622 : 600
  });

  // load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  // quit app when main window gets closed
  mainWindow.on('closed', function() {
    app.quit();
  });

  // create application menu
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  // create dock menu for osx
  if(process.platform == 'darwin') {
    const dockMenu = Menu.buildFromTemplate(dockMenuTemplate);
    app.dock.setMenu(dockMenu);
  }
});
