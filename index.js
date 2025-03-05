const express = require("express");
const os = require("os");
const axios = require("axios");

const app = express();

// Root route
app.get("/", (req, res) => {
  res.send("<h1>Hey guys, Welcome to my new Express Application !! update1</h1>");
});

// /info route
app.get("/info", (req, res) => {
  res.send("hey this is /info api");
});

// New route to return local system information (container IP and ECS task metadata)
app.get("/system-info", async (req, res) => {
  try {
    // Fetch ECS task metadata
    const metadataResponse = await axios.get("http://169.254.170.2/v2/metadata");
    
    let containerIP = null;
    // If the metadata response contains networkInterfaces and ipv4Addresses, get the container's IP address
    if (metadataResponse.data && metadataResponse.data.Containers && metadataResponse.data.Containers[0].networkInterfaces) {
      const networkInterfaces = metadataResponse.data.Containers[0].networkInterfaces;
      containerIP = networkInterfaces[0]?.ipv4Addresses?.[0] || "IP not found";
    }

    const systemInfo = {
      platform: os.platform(),
      arch: os.arch(),
      cpu: os.cpus(),
      memory: os.totalmem(),
      freeMemory: os.freemem(),
      hostname: os.hostname(),
      containerIP: containerIP, // Add the container's IP address
      networkInterfaces: os.networkInterfaces(),
      uptime: os.uptime(),
      ecsMetadata: metadataResponse.data, // Contains detailed ECS task information
    };

    res.json(systemInfo); // Return system information in JSON format
  } catch (error) {
    console.error("Error fetching ECS metadata:", error);
    res.status(500).send("Error fetching ECS metadata");
  }
});

// Start listening on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});

