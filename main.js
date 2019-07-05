// main.js
// we construct a desktop app, accept an input excel file and converts specified value to a bin file.

// Notice: this app cannot be bundled as a web application
const { app, BrowserWindow, ipcMain } = require('electron')
const convert = require("./utility").convert;
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win
let DEVELOPMENT = true;
if(process.env.production){
  DEVELOPMENT = false;
}
console.log(DEVELOPMENT);
function createWindow () {
  // 创建浏览器窗口。
  let windows_config = {
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration: true
    }
  }
  win = new BrowserWindow(windows_config)
  if(DEVELOPMENT == false){
    win.setMenuBarVisibility(false);
  }

  // 加载index.html文件
  win.loadFile('index.html')


  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('convert', (event, content) => {
    // unpack the content
    file_full_path = content.file_full_path;
    sheet_num = content.sheet_num;
    column_num = content.column_num;
    len_num = content.len_num;
    console.log(file_full_path);
    convert(file_full_path, sheet_num, column_num, len_num).then(
      function(resolve_val){
          console.log(resolve_val);
          event.reply('convert', resolve_val);
      });
})