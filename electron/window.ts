import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 720,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("./index.html");
}

app.whenReady().then(() => {
  createWindow();
});
