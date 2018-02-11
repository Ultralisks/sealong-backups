$(function () {
    function getAjax(url, para) {
        var getData = {};
        $.ajax({
            type: "get",
            url: url,
            data: para,
            cache: false,
            async: false,
            dataType: "json",
            success: function (res, textStatus, jqXHR) {
                if ("true" == res.flag) {
                    getData = res;
                } else {
                    alert("不合法！错误信息如下：" + data.errorMsg);
                }
            },
            error: function (res,XMLHttpRequest, textStatus, errorThrown) {
                console.log(res);
                alert("请求失败！");
            }
        });
        return getData;
    }
    function postAjax(url, para) {
        var postData = {};
        $.ajax({
            type: "post",
            url: url,
            data: para,
            cache: false,
            async: false,
            dataType: "json",
            success: function (res, textStatus, jqXHR) {
                if ("true" == res.flag) {
                    getData = res;
                } else {
                    alert("不合法！错误信息如下：" + data.errorMsg);
                }
            },
            error: function (res,XMLHttpRequest, textStatus, errorThrown) {
                console.log(res);
                alert("请求失败！");
            }
        });
        return postData;
    }
});