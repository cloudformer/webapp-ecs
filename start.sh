#!/bin/sh
# 定期检查 S3 上的 index.js 文件是否有更新
aws s3 cp s3://codeforautomation/ecsnodejs/index.js /express-app/index.js

#复制完index
ls 
ls /express-app

echo "Starting the app..."

node /express-app/index.js || echo "Error running index.js"
