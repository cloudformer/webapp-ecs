const express = require("express");
const os = require("os");

const app = express();

// 根路由
app.get("/", (req, res) => {
  res.send(`
    <h1>Hey guys, Welcome to my ECS automation pipeline Application !!</h1>
    <h2>hostname: ${os.hostname()}</h2> <!-- 动态显示主机名 -->
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

  // 返回系统信息，每项信息都换行显示
  res.send(`
    <h2>System Information</h2>
    <p><strong>Platform:</strong> ${systemInfo.platform}</p>
    <p><strong>Architecture:</strong> ${systemInfo.arch}</p>
    <p><strong>Hostname:</strong> ${systemInfo.hostname}</p>
    <p><strong>Uptime:</strong> ${systemInfo.uptime} seconds</p>
    <p><strong>CPU Information:</strong> ${systemInfo.cpu[0].model}</p> <!-- 简化输出CPU信息 -->
    <p><strong>Total Memory:</strong> ${(systemInfo.memory / (1024 * 1024 * 1024)).toFixed(2)} GB</p>
    <p><strong>Free Memory:</strong> ${(systemInfo.freeMemory / (1024 * 1024 * 1024)).toFixed(2)} GB</p>
    <p><strong>Network Interfaces:</strong></p>
    <pre>${JSON.stringify(systemInfo.networkInterfaces, null, 2)}</pre>
  `);
});

// 启动监听3000端口
app.listen(3000, () => {
  console.log("listening on port 3000");
});

