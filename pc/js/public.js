var publicRate = 4.9;
var rate = $('#rate'),
    totalAmount = $('#totalAmount'),
    term = $('#term'),
    level = $('#level')
amount = $('#amount');
$(function(){
    //$(".registerform").Validform();  //就这一行代码！;

    var demo=$(".registerform").Validform({
        tiptype:3,
        label:".label",
        showAllError:true,
        datatype:{
            "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
        },
        ajaxPost:false
    });

    //通过$.Tipmsg扩展默认提示信息;
    //$.Tipmsg.w["zh1-6"]="请输入1到6个中文字符！";
    demo.tipmsg.w["zh1-6"]="请输入1到6个中文字符！";

    demo.addRule([{
        ele:".inputxt:eq(0)",
        datatype:"zh2-4"
    },
        {
            ele:".inputxt:eq(1)",
            datatype:"m"
        }]);

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
        return tool.msg('请输入贷款金额')
    }
    if(!_term){
        return tool.msg('请选择贷款期限')
    }
    if(!_rate){
        return tool.msg('请输入年化利率')
    }
    if(isNaN(Number(_rate))){
        return tool.msg('请输入正确格式的利率')
    }
    var resultData = countWinMoney(_amount*10000,_payment,_rate,_term*12);
    totalAmount.val(formatNumber(resultData.total));
    $('#form_detail_total').text(formatNumber(resultData.total));
    $('#form_detail_term').text(resultData.term);
    $('#form_detail_perAmount').text(formatNumber(resultData.perAmount));
    $('#form_detail_interest').text(formatNumber(resultData.interest));
    $('#form_detail_amount').text(formatNumber(resultData.amount));
    $('.form_detail').show();
}

function reset() {
    rate.val(publicRate);
    totalAmount.val('');
    amount.val('');
    term.val('');
    level.val(1);
    $('.form_detail').hide();
}
