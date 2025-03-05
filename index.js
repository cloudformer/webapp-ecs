const express = require("express");
const os = require("os");
const axios = require("axios");

const app = express();

// 根路由
app.get("/", (req, res) => {
  res.send("<h1>Hey guys, Welcome to my new Express Application !! update1</h1>");
});

// /info 路由
app.get("/info", (req, res) => {
  // 返回包含超链接的简单 HTML 页面
  res.send(`
    <h1>This is simple information</h1>
    <p>For more information, visit <a href="/system-info">/system-info</a></p>
  `);
});

// /system-info 路由
app.get("/system-info", async (req, res) => {
  try {
    // 获取 ECS 任务的元数据
    const metadataResponse = await axios.get("http://169.254.170.2/v2/metadata", { timeout: 5000 });  // 设置5秒的超时，防止请求挂起
    const containerIP = metadataResponse.data.Containers[0].networkInterfaces[0].ipv4Addresses[0]; // 获取容器的 IP 地址
    
    const systemInfo = {
      platform: os.platform(),
      arch: os.arch(),
      cpu: os.cpus(),
      memory: os.totalmem(),
      freeMemory: os.freemem(),
      hostname: os.hostname(),
      containerIP: containerIP, // 添加容器的 IP 地址
      networkInterfaces: os.networkInterfaces(),
      uptime: os.uptime(),
      ecsMetadata: metadataResponse.data, // 包含 ECS 任务的详细信息
    };

    res.json(systemInfo); // 以 JSON 格式返回系统信息
  } catch (error) {
    console.error("Error fetching ECS metadata:", error.message); // 打印错误信息
    res.status(500).json({ error: "Error fetching ECS metadata", details: error.message });
  }
});

// 捕获未处理的请求
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// 启动监听3000端口
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// 处理未捕获的异常
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // 确保应用在遇到未捕获的异常后退出
});

// 处理未处理的Promise拒绝
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // 确保应用在遇到未处理的拒绝后退出
});

