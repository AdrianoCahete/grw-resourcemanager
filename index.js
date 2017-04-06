'use strict';
const electron = require('electron');

const app = electron.app;
//const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow
//const crashReporter = require('electron')

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	//const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
	let displays = electron.screen.getAllDisplays();

	const win = new BrowserWindow({
		minWidth: 1024,
		minHeight: 768,
		// width,
		// height,		
		backgroundColor: '#000',
		autoHideMenuBar: true,
		center: true,
		//icon: '/res/icon.png',

		show: false
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);
	//win.Menu(null);
	win.maximize();

	win.once('ready-to-show', () => {
		win.show()
	});

	return win;
}

// https://github.com/electron/electron/blob/v1.6.2/docs/api/crash-reporter.md#crashreporter
// function crashReporter () {
// 	crashReporter.start({
// 	productName: 'YourName',
// 	companyName: 'YourCompany',
// 	submitURL: 'https://your-domain.com/url-to-submit',
// 	uploadToServer: true
// 	})
// }

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});

// app.on('ready', function() {
//   var electronScreen = electron.screen;
//   var displays = electronScreen.getAllDisplays();
//   var externalDisplay = null;

//   for (var i in displays) {
//     if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
//       externalDisplay = displays[i];
//       break;
//     }
//   }

//   if (externalDisplay) {
//     mainWindow = createMainWindow ({
//       x: externalDisplay.id = 2,
//       y: externalDisplay.bounds.y + 50
//     });
//   }
// });
