
# v-dcard

基於Vue的前端框架以及強大的Vux組件，實作Dcard的漸進式網頁應用(_progressive web application_)，其中用到了包括代理伺服器、_Axios_、_infinite-scroll_ 組件。

	Dcard擁有其站所有文章/看板閱讀權利，若其有要求，隨時會關閉代理伺服器。
	
	＊ 此為開源專案，無任何廣告及盈利，僅作於學術交流。
	


## 技術棧
 - 使用代理伺服器，做跨域請求 [_cors-anywhere_](https://github.com/Rob--W/cors-anywhere)，並部署於Heroku。
 - 使用[_Dcard.js_](https://github.com/lockys/Dcard.js)裡頭的看板清單json。
 - 使用[_vux_](https://github.com/airyland/vux) (Vue UI component) 仿原生App的UI
 - 使用[_axios_](https://github.com/axios/axios)與 [_vue-infinite-scroll_](https://github.com/ElemeFE/vue-infinite-scroll) 做到異步請求與瀑布流
 - 使用 _vue-router_ 讓單頁面應用(_Single Page Application_)強健且強大。 
 
## 使用方式
在手機瀏覽器(Safari / Chrome)，將其加入主畫面，即可使用。
 
## Screeshot
![](https://raw.githubusercontent.com/realdennis/v-dcard/master/static/screenshot.png)


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# DEV模式下您需要自己建立cors的代理伺服器，並設定在8081port。

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## License
 
The MIT License (MIT)

Copyright (c) 2018 @realdennis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
