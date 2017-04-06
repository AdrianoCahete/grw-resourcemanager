'use strict';
const electron = require('electron');

const Menu = electron.Menu;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow

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
	const win = new BrowserWindow({
		width: 1024,
		height: 768
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);
	//win.Menu(null);

	return win;
}

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
