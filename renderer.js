// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const TabGroup = require("electron-tabs");

let tabGroup = new TabGroup();
let tab = tabGroup.addTab({
  title: "Electron",
  src: "page/page.html",
  visible: true,
  webviewAttributes: {
    nodeIntegration: true
  },
  active : true
});

function newTabs(){
    let tabGroup = new TabGroup();
    let tab = tabGroup.addTab({
    title: "Electron",
    src: "page/page.html",
    visible: true,
    webviewAttributes: {
    nodeIntegration: true
  }
});
}




//////////////////////////////////////////


