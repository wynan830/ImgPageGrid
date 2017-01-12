//h5组件工具操作
//by:魏亚楠
//date:2017-01-11
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    var grid = function (elem, option) {
        this.$elem = elem,
        this.data = [],
        this.defaults = {
            url: '',
            params: {},
            type: 'POST',
            width: '100%',
            height: 'auto',
            loading: '<div></div><div></div>',
            pageselect: [10, 20, 50, 100],
            page: { total: 0, records: 0, rows: 10, page: 0 },
            img: { width: '100px', animate: 'zoomIn' }
        },
        this.options = $.extend({}, this.defaults, option)
    }
    //定义方法
    grid.prototype = {
        create: function () {
            var $this = this;

            var str = [];
            if ($this.options.title) {
                str.push('<div class="panel-heading">' + $this.options.title + '</div>');
            }
            str.push('    <div class="panel-body" style="padding:2px">');
            str.push('        <div class="imggrid-list" style="height:' + $this.options.height + '">');
            str.push('            <ul>');
            str.push('            </ul>');
            str.push('            <div class="imggrid-loading">' + $this.options.loading + '</div>');
            str.push('        </div>');
            str.push('    <div class="panel-footer" style="padding:2px">');
            str.push('        <div class="imggrid-page">');
            str.push('            <table class="imggrid-pager-table">');
            str.push('                <tr>');
            str.push('                    <td class="imggrid-left">');
            str.push('                        <table>');
            str.push('                            <tr>');
            str.push('                                <td class="first_gridPager imggrid-disabled"><span class="glyphicon glyphicon-step-backward"></span></td>');
            str.push('                                <td class="prev_gridPager imggrid-disabled"><span class="glyphicon glyphicon-backward"></span></td>');
            str.push('                                <td class="imggrid-disabled"><span class="imggrid-separator"></span></td>');
            str.push('                                <td> <input class="imggrid-page-input form-control" type="text" value="0"> 共 <span class="imggrid-totalPage">0</span> 页</td>');
            str.push('                                <td class="imggrid-disabled"><span class="imggrid-separator"></span></td>');
            str.push('                                <td class="next_gridPager imggrid-disabled"><span class="glyphicon glyphicon-forward"></span></td>');
            str.push('                                <td class="last_gridPager imggrid-disabled"><span class="glyphicon glyphicon-step-forward"></span></td>');
            str.push('                                <td dir="ltr"><select class="imggrid-page-select form-control">');
            for (var i = 0; i < $this.options.pageselect.length; i++) {
                str.push('<option role="option" value="' + $this.options.pageselect[i] + '">' + $this.options.pageselect[i] + '</option>');
            }
            str.push('                                </select></td>');
            str.push('                            </tr>');
            str.push('                        </table>');
            str.push('                    </td>');
            str.push('                    <td class="imggrid-center"></td>');
            str.push('                    <td class="imggrid-right">显示第 1 - 0 条记录　检索到 0 条记录</td>');
            str.push('                </tr>');
            str.push('            </table>');
            str.push('        </div>');
            str.push('   </div>');
            str.push('</div>');
            $this.$elem.addClass('panel panel-default');
            $this.$elem.html(str.join(''));
            if ($this.options.width) { $this.$elem.css('width', $this.options.width); }
            var page = $this.$elem.find('.imggrid-page');
            page.find('.first_gridPager').on('click', function () {
                if ($this.isActivePageBtn(this)) { $this.gotopage(1); }
            });
            page.find('.prev_gridPager').on('click', function () {
                if ($this.isActivePageBtn(this)) { $this.gotopage($this.options.page.page - 1); }
            });
            page.find('.next_gridPager').on('click', function () {
                if ($this.isActivePageBtn(this)) { $this.gotopage($this.options.page.page + 1); }
            });
            page.find('.last_gridPager').on('click', function () {
                if ($this.isActivePageBtn(this)) { $this.gotopage($this.options.page.total); }
            });
            page.find('.imggrid-page-select').on('change', function () {
                if ($this.options.page.total > 0) {
                    $this.options.page.rows = parseInt($(this).val());
                    $this.options.page.page = 0;//重置分页
                    $this.gotopage(1);
                }
            });
            page.find('.imggrid-page-input').keydown(function (e) {
                var input = page.find('.imggrid-page-input');
                if (e.keyCode == 13) {
                    var inputvalue = input.val();
                    var reg = /^[1-9]+[0-9]*]*$/;
                    if (reg.test(inputvalue)) {
                        $this.gotopage(parseInt(inputvalue));
                    } else {
                        alert("请输入数字");
                        input.val(1);
                        $this.gotopage(1);
                    }
                }
            });
            $this.gotopage(1);
        },
        gotopage: function (page) {
            var $this = this;
            if ($this.options.page.page == page) { return; }
            if (page < 0 || ($this.options.page.total > 0 && page > $this.options.page.total)) { return; }
            $this.options.page.page = page;
            $this.loadData();
        },
        showLoading: function () { var $this = this; $this.$elem.find('.imggrid-loading').show(); },
        hideLoading: function () { var $this = this; $this.$elem.find('.imggrid-loading').hide(); },
        isActivePageBtn: function (o) { if ($(o).hasClass('imggrid-disabled')) { return false; } else { return true } },
        formatData: function (data) {
            var $this = this;
            var pagediv = $this.$elem.find('.imggrid-page');
            $this.options.page.records = data.records;
            $this.options.page.total = parseInt(data.records / $this.options.page.rows) + (data.records % $this.options.page.rows > 0 ? 1 : 0);
            if ($this.options.page.page <= 1) {
                pagediv.find('.first_gridPager').addClass('imggrid-disabled');
                pagediv.find('.prev_gridPager').addClass('imggrid-disabled');
            } else {
                pagediv.find('.first_gridPager').removeClass('imggrid-disabled');
                pagediv.find('.prev_gridPager').removeClass('imggrid-disabled');
            }
            if ($this.options.page.page >= $this.options.page.total) {
                pagediv.find('.next_gridPager').addClass('imggrid-disabled');
                pagediv.find('.last_gridPager').addClass('imggrid-disabled');
            } else {
                pagediv.find('.next_gridPager').removeClass('imggrid-disabled');
                pagediv.find('.last_gridPager').removeClass('imggrid-disabled');
            }
            $this.$elem.find('.imggrid-totalPage').html($this.options.page.total);
            var startrecord = ($this.options.page.page - 1) * $this.options.page.rows + 1;
            var endrecord = ($this.options.page.page - 1) * $this.options.page.rows + data.rows.length;
            $this.$elem.find('.imggrid-right').html('显示第 ' + startrecord + ' - ' + endrecord + ' 条记录　检索到 ' + $this.options.page.records + ' 条记录');
            $this.data = data.rows;
            if (data.rows.length > 0) {
                var strs = [];
                $.each(data.rows, function (index, item) {
                    strs.push('<li rowno="' + index + '">' + $this.options.render(item, index) + '</li>');
                })
                $this.$elem.find('.imggrid-list ul').html(strs.join(''));
                $this.$elem.find('.imggrid-list ul li').css('width', $this.options.img.width).css('height', $this.options.img.width);
                if ($this.options.onClick) {
                    $this.$elem.find('.imggrid-list ul li').on('click', function () {
                        var $li = $(this);
                        var index = parseInt($li.attr('rowno'));
                        $this.options.onClick($li, index, $this.data[index]);
                    });
                }
                if ($this.options.img.animate) {
                    $this.$elem.find('.imggrid-list ul li img').animateCss($this.options.img.animate);
                }
            } else {
                $this.$elem.find('.imggrid-list  ul').html('<li>无数据</li>');
            }
        },
        loadData: function () {
            var $this = this;
            var pagediv = $this.$elem.find('.imggrid-page');
            pagediv.find('.imggrid-page-input').val($this.options.page.page);
            if ($this.options.data) {//本地存储
                var startIndex = ($this.options.page.page - 1) * $this.options.page.rows;
                var endIndex = startIndex + $this.options.page.rows - 1;
                var newdata = {
                    page: $this.options.data.page,
                    records: $this.options.data.records,
                    rows: []
                };
                $.each($this.options.data.rows, function (index, item) {
                    if (index >= startIndex && index <= endIndex) {
                        newdata.rows.push(item);
                    }
                });
                $this.formatData(newdata);
            } else {//ajax获取
                $this.showLoading();
                $.ajax({
                    type: this.options.type, url: $this.options.url, data: $.param($.extend($this.defaults.page, $this.options.params)), dataType: 'json',
                    success: function (data) {
                        $this.hideLoading();
                        if (!data.message) {
                            $this.formatData(data);
                        } else {
                            alert(data.message);
                        }
                    }
                });
            }
        }
    }
    $.fn.imgGrid = function (options) {
        var $this = $(this);
        var mygrid = new grid($this, options);
        return mygrid.create();
    };
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
}));