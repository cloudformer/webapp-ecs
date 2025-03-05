const express = require("express");
const os = require("os");

const app = express();

// 根路由
app.get("/", (req, res) => {
  res.send(`
    <h1>Hey guys, Welcome to my new Express Application !!</h1>
    <p>For more information, visit <a href='/system-info'>/system-info</a></p>
  `);
});

// /info 路由
app.get("/info", (req, res) => {
  res.send("<h1>This is a simple info page. For more information, visit <a href='/system-info'>/system-info</a></h1>");
});

// 新增的路由，返回本机的信息（系统的基本信息）
app.get("/system-info", (req, res) => {
  const systemInfo = {
    platform: os.platform(),  // 操作系统平台 (如 linux, darwin, win32)
    arch: os.arch(),          // 系统架构 (如 x64)
    cpu: os.cpus(),           // CPU 信息
    memory: os.totalmem(),    // 总内存
    freeMemory: os.freemem(), // 剩余内存
    hostname: os.hostname(),  // 主机名
    networkInterfaces: os.networkInterfaces(), // 网络接口信息
    uptime: os.uptime()       // 系统启动时间
  };

  res.json(systemInfo); // 以 JSON 格式返回系统信息
});

// 启动监听3000端口
app.listen(3000, () => {
  console.log("listening on port 3000");
});

