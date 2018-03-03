(function(){
    var tool=function(){
        return new tool.fm.init()
    }
    tool.fm=tool.prototype={
        init:function(){
            return this;
        },
        msg:function(html){
            var html = '<div class="tcMsgOut"><div class="tcMsgBox">' + html + '</div></div>';
            $(document.body).append(html);
            setTimeout(function () {
                $(".tcMsgBox").animate({opacity: 0}, 1000, function () {
                    $(".tcMsgOut").remove();
                })
            }, 1500)

        }
    }
    tool=tool.prototype.init.prototype = tool.prototype;
    window.tool=tool
})(window,$);