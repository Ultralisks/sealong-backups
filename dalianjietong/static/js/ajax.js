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
                getData = res;
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
                // console.log(postData,1);
                postData = res;
                // console.log(postData,2);
            },
            error: function (res,XMLHttpRequest, textStatus, errorThrown) {
                console.log(res);
                alert("请求失败！");
            }
        });
        return postData;
    }