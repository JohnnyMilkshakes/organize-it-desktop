const { app, BrowserWindow, nativeImage, ipcMain } = require("electron");
const path = require("node:path");
const appIcon = nativeImage.createFromPath(path.join(__dirname, 'assets', 'icon.png'))


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'icon.icns'),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:5173");
};

app.dock.setIcon(appIcon)

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
