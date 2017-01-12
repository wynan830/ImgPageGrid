# 图片列表分页插件
ImgGrid,Page
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
 ##效果
 
