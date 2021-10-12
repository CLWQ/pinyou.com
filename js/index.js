$(function () {
    /* 全选按钮的改变 */
    $('.checkall').change(function () {
        /* prop():获取设置标签固有属性 */
        $('.check, .checkall').prop('checked',$(this).prop('checked'));
        /* 给选中模块加背景颜色 */
        if($('.checkall').prop('checked') === true){
            $('.message').addClass('current');
        }else {
            $('.message').removeClass('current');
        }
        getSum();
    })
    $('.check').change(function () {
        /* 如果被全选复选框的个数等于单个复选框个数的总和 */
        if($('.check:checked').length === $('.check').length){
            $('.checkall').prop('checked',true);
        }else {
            $('.checkall').prop('checked',false);
        }
        /* 给选中模块加背景颜色 */
        if($(this).prop('checked')){
            $(this).parents('.message').addClass('current');
        }else{
            $(this).parents('.message').removeClass('current');
        }
        getSum();
    })

    /* 商品数量加减 */
    $('.add').click(function () {
        /* val() 获取文本框的值 */
        var i = $(this).siblings('.itext').val();
        i++;
        $(this).siblings('.itext').val(i);
        /* html(),text(),获取文本框的值 */
        var p = $(this).parent().siblings('.price').text().substr(1);
        var price = (p*i).toFixed(2);
        $(this).parent().siblings('.pc_fee').find('b').text('￥' + price);
        getSum();
    })
    $('.minus').click(function () {
        /* val() 获取文本框的值 */
        var i = $(this).siblings('.itext').val();
        if(i == 1){
            return;
        }
        i--;
        $(this).siblings('.itext').val(i);
        /* html(),text(),获取文本值 */
        var p = $(this).parent().siblings('.price').text().substr(1);
        var price = (p*i).toFixed(2);
        $(this).parent().siblings('.pc_fee').find('b').text('￥' + price);
        getSum();
    })

    /* 用户修改文本框的值 */
    $('.itext').change(function () {
        var i = $(this).val();
        var p = $(this).parent().siblings('.price').text().substr(1);
        var price = (p*i).toFixed(2);
        $(this).parent().siblings('.pc_fee').find('b').text('￥' + price);
        getSum();
    })

    getSum();
    /* $.each()方法可以用于遍历任何对象 i:索引号， ele：遍历对象 */
    function getSum() {
        var sumCount = 0;
        var sumPrice = 0;
        $.each($('.itext'), function (i,ele) {
            if($(ele).parent().siblings().find('.check').prop('checked') === true){
                sumCount += parseInt($(ele).val());
            }
        })
        $('.sum_list .choose i').text(sumCount);
        $.each($('.pc_fee').find('b'), function (i,ele) {
            if($(ele).parent().siblings().find('.check').prop('checked') === true){
                sumPrice += parseFloat($(ele).text().substr(1));
            }
        })
        $('.sum_list').find('b').text(sumPrice.toFixed(2));
    }

    $('.delete').click(function () {
        $(this).parents('.message').remove();
        getSum();
    })
    $('.delete_check').click(function () {
        $.each($('.check'), function (i,ele) {
            if($(ele).prop('checked') === true){
                $(ele).parents('.message').remove();
            }
        })
        getSum();
    })
    $('.clear').click(function () {
        $('.message').remove();
        getSum();
    })
})