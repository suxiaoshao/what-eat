# 项目启动说明

## 安装环境

### node 安装

需要安装 node ,可以到这个 [页面](https://nodejs.org/zh-cn/) 下载,
注意我们需要安装长期支持版

安装时 

![示例](https://ftp.bmp.ovh/imgs/2020/10/5fcd725d45564509.png)

安装完成之后测试

```bash
npm --version
```

和

```bash
node --version
```

是否能得到正确的版本信息

### 配置国内源安装yarn

在命令行里输入以下命令

```bash
npm config set registry https://registry.npm.taobao.org
```

全局安装 yarn 

```bash
npm install -g yarn
```

配置 yarn 国内源

```bash
yarn config set registry https://registry.npm.taobao.org
```

### 安装 taro/cli

输入以下命令

```bash
yarn global add @tarojs/cli
```

## 项目启动

进入这个项目目录,输入

```bash
yarn
```

再输入

```
yarn dev:weapp
```

如果出现

![示例图](https://ftp.bmp.ovh/imgs/2020/10/1a8f42e29bfca6b6.png)

说明以上操作全部成功
