# Chrome 扩展插件
## webpack打包 npm start 到Z-PlugCoder的dist文件下
## manifest.json 主配置

## 避免样式污染，统一zPlug开头，BEM命名规范

## 最外层index.html作为github登录回调传回code码的页面，部署在GitHub上


## Login

    github登录获取token，用于连接


## TranslatePlug
```
    翻译功能
    选中文字进行翻译
```
## WindowPlug
```
    天气功能
```
## Sprite
 # bird
    几只飞来飞去的鸟
    
显示精灵
## BookMark
书签同步功能
```
    同步书签到github
        github配置：1.UserName:用户名
                    2.Access Token:(1)替代密码的登录令牌（github Settings -> Developer settings -> Personal access tokens ）
                                    (2)改为第三方授权登录获取token
                    3.Path:书签保存的Json路径（需先创建项目，创建Json文件）例如：BookMark/bookmarks.json
                    4.SaveMessage:是否保存登录信息
```

## background.js
```
    1.ajax请求，无跨域限制
    2.选中文字右键百度搜索功能
```
### three.min.js
Three3D
