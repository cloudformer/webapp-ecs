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
      <h2>System Information</h2><table border="1">
      <tr><td colspan="2"><a href='/'><h2>Back to Homepage</h2></a></td></tr>
      <tr><th><h2>Property</h2></th><th>Value</th></tr>
      <tr><td><h5>Platform</h5></td><td>${systemInfo.platform}</td></tr>
      <tr><td><h5>Architecture</h5></td><td>${systemInfo.arch}</td></tr>
      <tr><td>Hostname</td><td>${systemInfo.hostname}</td></tr>
      <tr><td>Uptime</td><td>${systemInfo.uptime} seconds</td></tr>
      <tr><td>CPU Information</td><td>${systemInfo.cpu[0].model}</td></tr>
      <tr><td>Total Memory</td><td>${(systemInfo.memory / (1024 * 1024 * 1024)).toFixed(2)} GB</td></tr>
      <tr><td>Free Memory</td><td>${(systemInfo.freeMemory / (1024 * 1024 * 1024)).toFixed(2)} GB</td></tr>
      <tr><td>Network Interfaces</td><td><pre>${JSON.stringify(systemInfo.networkInterfaces, null, 2)}</pre></td></tr></table> 
  `);
});

// 启动监听3000端口
app.listen(3000, () => {
  console.log("listening on port 3000");
});

