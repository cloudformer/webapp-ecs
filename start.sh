#!/bin/bash

# 定期检查 S3 上的 index.js 文件是否有更新
aws s3 cp s3://codeforautomation/ecsnodejs/index.js /express-app/index.js

# 启动 Node.js 应用
node index.js

