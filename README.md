Apache SkyWalking Rocketbot UI
===============
## 项目结构说明
```
src
  assets                     --公共资源(图片，icon，样式等)
  components                 --公共组件(APM使用的基础组件：按钮、下拉框等)  
  config                     --axios配置文件
  store                      --全局参数和方法(APM使用)
  types                      --ES6接口文档
  utils                      --公共方法(APM使用)
  views                      
    components               --页面公共组件(一个页面被拆分为多个组件)
    apm                      --应用性能管理业务
    flowRecordReplay         --流量回放业务
    oam                      --运维管理业务
    sentinel                 --流量控制业务
    home-page.vue            --首页
    index.vue                --vue项目入口
    login.vue                --登录页

.env.http                    --http前端配置
.env.https                   --https前端配置
default.conf                 --nginx配置
Dockerfile                   --docker打包配置
vue.config.js                --本地代理配置
```

## 本地执行说明
```
1. git获取项目
2. 主路径下控制台执行  npm install ，下载依赖包
3. 修改 vue.config.js 配置后端地址
4. npm run serve 运行服务
```

## docker打包流程
```
1. git获取项目
2. 主路径下控制台执行 npm install ，下载依赖包
3. 按需求修改 .env.http 或 .env.https 配置文件
4. 执行 npm run build-http 或 npm run build-https 进行代码编译（编辑文件存放在dist文件夹中）
5. 按需修改 default.conf （nginx配置）
6. 执行docker打包命令 'docker build -t 镜像名 .'
```

<img src="http://skywalking.apache.org/assets/logo.svg" alt="Sky Walking logo" height="90px" align="right" />

[Apache SkyWalking](https://github.com/apache/incubator-skywalking) UI.

[![Build Status](https://travis-ci.org/apache/skywalking-rocketbot-ui.svg?branch=master)](https://travis-ci.org/apache/skywalking-rocketbot-ui)

# Contact Us
* Submit an [issue](https://github.com/apache/skywalking/issues)
* Mail list: **dev@skywalking.apache.org**. Mail to `dev-subscribe@skywalking.apache.org`, follow the reply to subscribe the mail list.
* Join `skywalking` channel at [Apache Slack](https://join.slack.com/t/the-asf/shared_invite/enQtNzc2ODE3MjI1MDk1LTAyZGJmNTg1NWZhNmVmOWZjMjA2MGUyOGY4MjE5ZGUwOTQxY2Q3MDBmNTM5YTllNGU4M2QyMzQ4M2U4ZjQ5YmY). If the link is not working, find the latest one at [Apache INFRA WIKI](https://cwiki.apache.org/confluence/display/INFRA/Slack+Guest+Invites).
* QQ Group: 392443393(2000/2000, not available), 901167865(available)

## Release
This repo wouldn't release separately. All source codes have been included in the main repo release. The tags match the [main repo](https://github.com/apache/skywalking) tags.

## Development

 The app was built with [vue + typescript](https://github.com/vuejs/vue).

### Prepare

1. Fork, then clone the repo and change directory into it.
1. Install dependencies via `npm`:

```
npm install
```

### Build

**Notice, as SkyWalking primary UI, the npm build has been integration in SkyWalking dist build.** 

**All following builds are for dev.**
```
npm install
npm run serve
```

The default UI address is `http://localhost:8080`.

# License
[Apache 2.0 License.](/LICENSE)
