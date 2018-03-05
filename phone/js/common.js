var publicRate = 4.9;
var rate = $('#rate'),
    totalAmount = $('#totalAmount'),
    term = $('#term'),
    level = $('#level'),
    amount = $('#amount');
$(function () {
    $('.dmenu').on('click',function(event) {
        $(this).find('.dropdown').toggle();
        event.stopPropagation();
    });

    $('.i-question li').on('click',function () {
        $(this).addClass('on').siblings().removeClass('on')
    });

    $('body').on('click',function () {
        $('.dropdown').hide();
    });

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination'
    });
    $('.form-cover .close').on('click',function () {
        $('.form-cover').hide();
        $('body').removeAttr('style');
        $('#name,#phone').val('')
    });
    $('.popForm').on('click',function () {
        $('.form-cover').show().addClass('in').removeClass('out');
        $('body').css({"position": "fixed", "width": "100%"})
    });

    $('#dosubmit').on('click',function (event) {
        var name = $('#name').val();
        var phone = $('#phone').val();
        if(name === '' || name === undefined){
            event.preventDefault();
            return msg('请输入姓名')
        }
        if(!/^[\u4E00-\u9FA5]{2,4}$/.test(name)){
            event.preventDefault();
            return msg('请输入正确的格式的姓名')
        }
        if(phone === '' || phone === undefined){
            event.preventDefault();
            return msg('请输入手机号')
        }
        if(!/^1\d{10}$/.test(phone)){
            event.preventDefault();
            return msg('请输入正确格式的手机号')
        }
    })

})
function countWinMoney(money,payType,rate,bindTime) {
    var resoultMoney;
    var perMoney;
    var montyRate = rate/1200;
    if(payType == 3) {
        resoultMoney = (money*bindTime*montyRate*Math.pow((1+montyRate),bindTime)/(Math.pow((1+montyRate),bindTime)-1)).toFixed(2);
        perMoney = (resoultMoney / bindTime).toFixed(2)
    }else if(payType == 4) {
        resoultMoney = (money*montyRate*(1+parseInt(bindTime))/2).toFixed(2);
        perMoney = (resoultMoney / bindTime).toFixed(2)
    }else {
        resoultMoney = (money*rate*bindTime/1200).toFixed(2);
        perMoney = (resoultMoney / bindTime).toFixed(2);
        resoultMoney = (parseFloat(resoultMoney) + parseFloat(money)).toFixed(2);
    }
    var resultData = {};
    resultData.total = resoultMoney;
    resultData.term = bindTime;
    resultData.amount = (+money).toFixed(2);
    resultData.interest = ((Math.round(resoultMoney*100)-Math.round(money*100))/100).toFixed(2);
    resultData.perAmount = perMoney;
    return resultData;
}

function changeLevel(event) {
    var target = $(event.target);
    var level = target.val();
    rate.val(Math.round(publicRate*100) * Math.round(level*100)/ 10000)
}

function formatNumber(num) {
    return (num || 0).toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

function calculate() {
    var _amount = amount.val();
    var _term = term.val();
    var _rate = rate.val();
    var _payment = $('#payment input:checked').val();
    if(!_amount){
        return msg('请输入贷款金额')
    }
    if(!_term){
        return msg('请选择贷款期限')
    }
    if(!_rate){
        return msg('请输入年化利率')
    }
    if(isNaN(Number(_rate))){
        return msg('请输入正确格式的利率')
    }
    var resultData = countWinMoney(_amount*10000,_payment,_rate,_term*12);
    totalAmount.text(formatNumber(resultData.total));
    $('#form_detail_total').text(formatNumber(resultData.total));
    $('#form_detail_term').text(resultData.term);
    $('#form_detail_perAmount').text(formatNumber(resultData.perAmount));
    $('#form_detail_interest').text(formatNumber(resultData.interest));
    $('#form_detail_amount').text(formatNumber(resultData.amount));
    $('.form_detail').show();
}

function reset() {
    rate.val(publicRate);
    totalAmount.text('');
    amount.val('');
    term.val('');
    level.val(1);
    $('.form_detail').hide();
}
function msg(html){
    var html = '<div class="tcMsgOut"><div class="tcMsgBox">' + html + '</div></div>';
    $(document.body).append(html);
    setTimeout(function () {
        $(".tcMsgBox").animate({opacity: 0}, 1000, function () {
            $(".tcMsgOut").remove();
        })
    }, 1500)

}