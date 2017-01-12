# 图片列表分页插件
图片分页插件，支持本地js数组分页加载和ajax服务器端加载。
图片有多种展示动画效果，可以自定义，主要用到了animate.min.css，当然这个不是必须项，如果不需要，可以去掉animate.min.css引用。
##效果
![image](http://ojna4zpbt.bkt.clouddn.com/imgggrid.png)
##引用
```javascript
    <link href="http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="http://cdn.bootcss.com/animate.css/3.5.2/animate.min.css" rel="stylesheet">
    <script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
    <link href="css/imggrid.css" rel="stylesheet" />
    <script src="js/imggrid.js"></script>
```
##网页标签
```javascript
    <div id="imggrid">
    </div>
```
##js初始化
js加载数据有两种方式：
###1、本地加载
```javascript
        var data = {
            "page": 1,//当前页码
            "records": 19,//总条数
            "rows": [{ "Id": 60, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 61, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 62, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 63, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 64, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 65, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 66, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 67, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 68, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 69, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 70, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 71, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 72, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 73, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 74, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 75, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 76, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 77, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" },
                    { "Id": 78, "ImgUrl": "http://ojna4zpbt.bkt.clouddn.com/1.jpg" }
            ]
        };
         $('#imggrid').imgGrid({
            title: '图片集',
            type: 'GET',//GET|POST
            data:data,//本地数据
            //url: 'Data/data.json',//ajax URL
            params: { type: 0 },//url参数
            height: '400px',
            width: '850px',
            img: { width: '200px', animate: 'zoomIn' },//图片宽度，及动画效果
            onClick: function (obj, index, item) {//点击图片事件
                alert(index);
            },
            render: function (item, index) {//自定义显示图片
                var str = '<img src="' + item.ImgUrl + '">';
                return str;
            }
        });
```
###2、ajax从服务器分页加载
```javascript
        $('#imggrid').imgGrid({
            title: '图片集',
            type:'GET',//GET|POST
            url: 'Data/data.json',//url
            params: { type: 0 },//url参数
            height: '400px',
            width: '1000px',
            img: { width: '200px', animate: 'zoomIn' },//图片宽度，及动画效果
            onClick: function (obj,index, item) {//点击图片事件
                alert(index);
            },
            render: function (item, index) {//自定义显示图片
                var str = '<img src="' + item.ImgUrl + '">';
                return str;
            }
        });
```
