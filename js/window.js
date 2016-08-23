define(['jquery'],function($){

    function Win(){
        this.cfg = {
            width:500,
            height:300,
            content:'',
            title:'系统消息',
            hasCloseBtn:false,
            handler4AlertBtn:null,
            handler4CloseBtn:null,
            skinClassName:null,
            text4AlertBtn:'确定',
            hasMask:true
        }
    }

    Win.prototype = {
        alert:function(cfg){

            //合并Win函数里面的cfg属性和cfg参数
            var CFG = $.extend(this.cfg,cfg);

            // 动态创建弹出层
            var boundingBox = $(
                '<div class="window_boundingBox">'+
                    '<div class="window_header">'+ CFG.title+'</div>'+
                    '<div class="window_body">'+CFG.content+'</div>'+
                    '<div class="window_footer"><input type="button" value="'+CFG.text4AlertBtn+'" class="window_alertBtn"/></div>'
                +'</div>'),
                btn = boundingBox.find('.window_alertBtn')
                mask = null;    

            boundingBox.appendTo('body');

            if(CFG.hasMask){
                mask = $('<div class="window_mask"></div>');
                mask.appendTo('body');
            }

            btn.click(function(){

                //handler4AlertBtn
                CFG.handler4AlertBtn && CFG.handler4AlertBtn();
                boundingBox.remove();

                mask && mask.remove();
            });

            //动态设置弹出框的css属性，宽高以及坐标
            boundingBox.css({
                width:this.cfg.width + 'px',
                height:this.cfg.height + 'px',
                left:(this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
                top:(this.cfg.y || (window.innerWidth - this.cfg.height) / 2) + 'px'
            });

            if(CFG.hasCloseBtn){
                var closeBtn = $('<span class="window_close">X</span>');
                closeBtn.appendTo(boundingBox);
                closeBtn.click(function(){
                    CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                    boundingBox.remove();
                    mask && mask.remove();
                });
            }
            if(CFG.skinClassName){
                boundingBox.addClass(CFG.skinClassName);
            }

        },
        confirm:function(){},
        prompt:function(){}
    }

    return {
        Win : Win
    }
});