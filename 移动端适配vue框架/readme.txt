1.webpack 3.x配置 


2.屏幕自适应

2.1安装 lib-flexible
	npm i lib-flexible --save-dev
2.2引入 lib-flexible
	// main.js
	import 'lib-flexible'

2.3添加 meta 标签
	在项目根目录的 index.html 中添加如下 meta
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

2.4 px 转 rem
	
2.4.1安装 px2rem-loader	
	npm i px2rem-loader --save-dev
2.4.2配置 px2rem-loade
	// utils.js
	var cssLoader = {
  		loader: 'css-loader',
  		options: {
  		   minimize: process.env.NODE_ENV === 'production',
  		   sourceMap: options.sourceMap
	        }
	}
	var px2remLoader = {
  		loader: 'px2rem-loader',
  		options: {
  		 	 remUnit: 75
 		}
	}
2.4.3并放进 loaders 数组中
	// utils.js
	function generateLoaders(loader, loaderOptions) {
 		 var loaders = [cssLoader, px2remLoader] //新版本有误
  	// ...
	}

3// 用于适配ipad以及ipad pro
 <script>
    ;/(iPhone|iPad|iPhone OS|Phone|iPod|iOS)/i.test(navigator.userAgent) &&
      ((head = document.getElementsByTagName('head')),
      (viewport = document.createElement('meta')),
      (viewport.name = 'viewport'),
      (viewport.content =
        'target-densitydpi=device-dpi, width=750px, user-scalable=no'),
      head.length > 0 && head[head.length - 1].appendChild(viewport))
  </script>

4.修改npm run build 打包时生成的路径  
        /config/index.js中
        
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),  // 默认./dist
    ........
  }

5.在路由配置中  router.js
    mode : hash模式 改为 mode:history时出现npm run build打包之后,打开html文件，网页空白

6.背景图片的引用问题  
	build文件夹下的utils.js代码
	
	 if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath:"../../"  //背景图片的引用问题
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
7.修改域名和端口
	在config中的index.js文件中
	dev{
		....
		 host: '192.168.16.61', // can be overwritten by process.env.HOST
   		 port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
		....
	}
