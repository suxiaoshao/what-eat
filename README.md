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

```bash
yarn dev:weapp
```

如果出现

![示例图](https://ftp.bmp.ovh/imgs/2020/10/1a8f42e29bfca6b6.png)

说明以上操作全部成功

## taro 路由跳转问题

### taro 路由概念

taro 定义一个页面就是在 app.config.ts 中添加一个 pages 字段添加页面组件的组件文件夹(通常是 .tsx 文件)

taro 页面分为 普通页面和 tabBar 页面,tabBar 页面就是 app.config.ts 中 tabBar 下添加的页面,在我们的项目中 tabBar 页面就是,my/index/filter 这几个

跳转至普通页面需要用到 Taro.navigateTo

需要这样导入使用

```typescript
import {navigateTo} from '@taro/taro'

navigateTo({url:'/pages/common/markedWindow/index'})
// url 就是跳转到页面的路径,注意需要在 pages 前面加上 /
```
