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
  res.send("<h1>This is a simple info page. For more information, visit <a href='/system-info'>/system-info</a></h1>");
});

// 新增的路由，返回本机的信息（容器的 IP 和 ECS 任务元数据）
app.get("/system-info", async (req, res) => {
  try {
    // 获取 ECS 任务的元数据
    const metadataResponse = await axios.get("http://169.254.170.2/v2/metadata");

    // 打印返回的数据，查看 ECS 元数据
    console.log(metadataResponse.data);

    // 检查 metadataResponse 是否包含期望的数据
    if (!metadataResponse.data || !metadataResponse.data.Containers || metadataResponse.data.Containers.length === 0) {
      return res.status(500).json({ error: "ECS metadata response is missing containers information" });
    }

    // 获取容器的 IP 地址
    const containerIP = metadataResponse.data.Containers[0].networkInterfaces[0].ipv4Addresses[0];

    // 收集系统信息
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
    console.error("Error fetching ECS metadata:", error);
    res.status(500).json({ error: "Error fetching ECS metadata", details: error.message });
  }
});

// 启动监听3000端口
app.listen(3000, () => {
  console.log("listening on port 3000");
});

