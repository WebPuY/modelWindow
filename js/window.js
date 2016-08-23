define(['jquery'],function($){

    function Win(){
        this.cfg = {
            width:500,
            height:300,
            content:'',
            handler:null
        }
    }

    Win.prototype = {
        alert:function(cfg){

            //合并Win函数里面的cfg属性和cfg参数
            var CFG = $.extend(this.cfg,cfg);

            // 动态创建弹出层
            var boundingBox = $('<div class="window_boundingBox"></div>');
            boundingBox.appendTo('body');
            boundingBox.html(CFG.content);

            // 给弹出层动态添加关闭按钮
            var btn = $('<input type="button" value="确定" />');
            btn.appendTo(boundingBox);
            btn.click(function(){

                //handler是回调函数
                CFG.handler && CFG.handler();
                boundingBox.remove();
            });

            //动态设置弹出框的css属性，宽高以及坐标
            boundingBox.css({
                width:this.cfg.width + 'px',
                height:this.cfg.height + 'px',
                left:(this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
                top:(this.cfg.y || (window.innerWidth - this.cfg.height) / 2) + 'px'
            });
        },
        confirm:function(){},
        prompt:function(){}
    }

    return {
        Win : Win
    }
});