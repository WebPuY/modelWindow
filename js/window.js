define(['jquery','jqueryUI'],function($,$UI){

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
            hasMask:true,
            isDraggable:true,
            dragHandle:null
        };

        this.handlers = {};
    }

    Win.prototype = {
        //自定义事件：观察者模式，让多个观察者对象同时监听某一个主题对象。这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。先监听有多少事件，然后依次执行一遍
        on:function(type,handler){
            if(typeof this.handlers[type] == 'undefined'){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);

            return this;    //return this是为了链式调用
        },
        fire:function(type,data){
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for(var i = 0,len = handlers.length; i < len; i ++){
                    handlers[i](data);
                }
            }
            return this;
        },
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
                mask = null,
                that = this;    

            boundingBox.appendTo('body');

            if(CFG.hasMask){
                mask = $('<div class="window_mask"></div>');
                mask.appendTo('body');
            }

            btn.click(function(){
                boundingBox.remove();
                mask && mask.remove();
                that.fire('alert');
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
                    boundingBox.remove();
                    mask && mask.remove();
                    that.fire('close');
                });
            }

            // if(CFG.handler4AlertBtn){
            //     this.on('alert',CFG.handler4AlertBtn);
            // }
            CFG.handler4AlertBtn && this.on('alert',CFG.handler4AlertBtn);
            // if(CFG.handler4CloseBtn){
            //     this.on('close',CFG.handler4CloseBtn);
            // }
            CFG.handler4CloseBtn && this.on('close',CFG.handler4CloseBtn);
            
            if(CFG.skinClassName){
                boundingBox.addClass(CFG.skinClassName);
            }

            if(CFG.isDraggable){
                if(CFG.dragHandle){
                    boundingBox.draggable({handle:CFG.dragHandle});
                } else {
                    boundingBox.draggable();
                }
            }

        },
        confirm:function(){},
        prompt:function(){}
    }

    return {
        Win : Win
    }
});