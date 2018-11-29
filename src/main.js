const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
//热更新
if(process.env.ELECTRON_START_URL){
  require('electron-reload')(process.env.ELECTRON_START_URL, {
    electron: require('electron-prebuilt'),
    // electron: path.join(process.env.ELECTRON_START_URL, 'node_modules', '.bin', 'electron'),
    // hardResetMethod: 'exit'
  })
}
console.log('dsdsxc', process.env.ELECTRON_START_URL)
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    backgroundColor: '#ff0fff',
    icon: path.join(__dirname, 'public/icons/png/64x64.png')
  })
  // 加载应用----适用于 react 项目
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});
  mainWindow.loadURL(startUrl);
  // 打开开发者工具，默认不打开
  // mainWindow.webContents.openDevTools()

  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  require('../menu/mainmenu')
  console.log(require('../menu/mainmenu'))
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})
