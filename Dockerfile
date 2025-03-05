FROM node:alpine

# 安装 AWS CLI
RUN apk add --no-cache aws-cli

WORKDIR /express-app

# 复制 package.json 并安装依赖
COPY package.json ./
RUN npm install

# 拷贝 start.sh 脚本
COPY start.sh /express-app/start.sh

# 给 start.sh 脚本添加可执行权限
RUN chmod +x /express-app/start.sh

# 暴露端口
EXPOSE 3000

# 设置容器启动时执行 start.sh 脚本
CMD ["/express-app/start.sh"]













