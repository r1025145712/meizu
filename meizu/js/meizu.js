function getData() {
    get({
        url: 'http://localhost:8080/meizu/js/index.php?fn=getData', success: function (data) {
            // 
            render(data);
            // event(_list);
        }
    })
}
getData();
function page(count) {
    var str = '';
    var str = `<li onclick="pnPage('prev')"><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`;
    for (var i = 1; i <= count; i++) {
        // 判断是第一页添加active
        var cla = '';
        // if (biao) {
        //     if (i == biao) {
        //         cla = 'class="active"';
        //     }
        // }

        if (i == 1) {
            cla = 'class="active"';
        }

        str += `<li ${cla}><a href="javascript:void(0)" onclick="getPage(${i})">${i}</a></li>`;

    }
    // 将页码追加到页面中
    str += `<li onclick="pnPage('next')"><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`;
    document.querySelector('.pagination').innerHTML = str;

}
/******排序********/
function sort(field, btnObj) {
    var sort = btnObj.getAttribute('sort');
    // 1修改页按钮文字
    var str = '';
    if (field == 'p_money1') str = '价格';
    if (field == 'p_volume') str = '销量';

    if (sort == 'asc') str += '降序';
    if (sort == 'desc') str += '降序';

    btnObj.innerHTML = str;
    //2 修改sort属性
    var tmpSort = sort == 'desc' ? 'asc' : 'desc';
    btnObj.setAttribute('sort', tmpSort);
    //3 发送请求获取数据
    var params = 'fn=getData&field=' + field + '&sort=' + sort;

    get({
        url: 'http://localhost:8080/meizu/js/index.php?' + params, success: function (data) {
            // console.log(data);
            // 4 渲染数据
            render(data);
        }
    });
    // 将排序的方式,保存到local

    localStorage.setItem('field', field);
    localStorage.setItem('sort', sort);

}
//渲染数据
function render(data) {
    var serverObj = JSON.parse(data);

    // 获取列表数据的
    var _list = serverObj.res;
    // 将数据追加到页面中
    var str = '';
    for (var i = 0; i < _list.length; i++) {
        str += '<li class="phone3">' +
            '<div class="section-item-box">' +
            '<a href="cart.html?id=' + _list[i].ID + '">' +
            '<img src="img/phone/' + _list[i].p_image + '" alt="">' +
            '<span class="box-info ">' +
            '<span class="goods-desc">已售：' + _list[i].p_volume + '件</span>' +
            '<span class="goods-name">' + _list[i].p_name + '</span>' +
            '<span class="goods-desc">' + _list[i].p_price + '</span>' +
            '<span class="goods-price"><i>￥</i>' + _list[i].p_money1 + '<em></em><s></s>' +
            '</span>' +
            '</span>' +
            '</a>' +
            '</div>' +
            '</li>';
    }
    // 将td追加到页面中
    document.querySelector('.phone-agg').innerHTML = str;
    //调用分页的方法
    page(serverObj.count);
}


//左右翻页
function pnPage(pn) {

    var lisObj = document.querySelectorAll(".pagination li");
    var len = lisObj.length;
    for (var i = 1; i <= len; i++) {
        if (lisObj[i - 1].className == 'active') {
            //判断是上翻页还是下翻页
            if (pn == 'next') {
                // 判断i是否大于最大的页码数
                if (i <= (len - 2)) {
                    getPage(i);
                }
            }
            // 上翻页
            if (pn == 'prev') {
                // 判断页码是否为1
                if ((i - 2) > 0) getPage(i - 2);
            }

        }
    }
}
/***无刷新分页的方法***/
function getPage(tmpPage) {

    var field = localStorage.getItem('field');
    var sort = localStorage.getItem('sort');
    var param = 'fn=getData&page=' + tmpPage;
    if (field && sort) { // 页面中存在排序则使用
        param += '&field=' + field + '&sort=' + sort;
    }
    // 发送ajax请求,获取对应的数据
    get({
        url: 'http://localhost:8080/meizu/js/index.php?fn=getData&page=' + param, success: function (data) {
            // console.log(data);
            // 转化为js的object
            var obj = JSON.parse(data);
            var _list = obj.res;

            //console.log(pageData);
            // 循环数据追加到页面
            var str = '';
            for (var i = 0; i < _list.length; i++) {
                str += '<li class="phone3">' +
                    '<div class="section-item-box">' +
                    '<a href="cart.html?id=' + _list[i].ID + '">' +
                    '<img src="img/phone/' + _list[i].p_image + '" alt="">' +
                    '<span class="box-info ">' +
                    '<span class="goods-desc">已售：' + _list[i].p_volume + '件</span>' +
                    '<span class="goods-name">' + _list[i].p_name + '</span>' +
                    '<span class="goods-desc">' + _list[i].p_price + '</span>' +
                    '<span class="goods-price"><i>￥</i>' + _list[i].p_money1 + '<em></em><s></s>' +
                    '</span>' +
                    '</span>' +
                    '</a>' +
                    '</div>' +
                    '</li>';
            }
            document.querySelector('.phone-agg').innerHTML = str;
            /******修改页面中选中的页码*****/
            var lisObj = document.querySelector('.pagination').children;
            // 循环所有的li,去除class样式
            for (var i = 0; i < lisObj.length; i++) {
                lisObj[i].className = '';
            }; 
            lisObj[tmpPage].className = 'active';
            // event(_list);
        }
    });
}
function get(obj) {
    var xhr = new XMLHttpRequest();
    // 打开请求
    xhr.open('get', obj.url);
    //发送请求
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            obj.success(xhr.responseText);
        }
    }
}
function $(obj) {
    return document.querySelector(obj);
}