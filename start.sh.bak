#!/bin/sh
# 定期检查 S3 上的 index.js 文件是否有更新start1sh
echo "Fetching index.js from S3..."
aws s3 cp s3://codeforautomation/ecsnodejs/index.js /express-app/index.js
# 确保文件被正确下载
echo "Listing /express-app directory:"
ls /express-app
ls
# 查看 index.js 的内容
echo "Content of index.js:"
cat /express-app/index.js
echo "Starting the app..."
# 运行 index.js，并捕获错误输出
node /express-app/index.js 2>&1 || echo "Error running index.js"


