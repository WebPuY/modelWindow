define(['widget','jquery','jqueryUI'],function(widget,$,$UI){

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

    Win.prototype = $.extend({},new widget.Widget(),{

        renderUI:function(){
            this.boundingBox = $(
                '<div class="window_boundingBox">'+
                    '<div class="window_header">'+ this.cfg.title+'</div>'+
                    '<div class="window_body">'+this.cfg.content+'</div>'+
                    '<div class="window_footer"><input type="button" value="'+this.cfg.text4AlertBtn+'" class="window_alertBtn"/></div>'
                +'</div>');

            if(this.cfg.hasMask){
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
            }

            if(this.cfg.hasCloseBtn){
                this.boundingBox.append('<span class="window_close">X</span>');
            }
            this.boundingBox.appendTo(document.body);
        },

        bindUI:function(){
            var that = this; 
            this.boundingBox.delegate('.window_alertBtn','click',function(){
                that.fire('alert');
                that.destory();
            }).delegate('.window_close','click',function(){
                that.fire('close');
                that.destory();
            });

            // if(this.cfg.handler4AlertBtn){
            //     this.on('alert',this.cfg.handler4AlertBtn);
            // }
            this.cfg.handler4AlertBtn && this.on('alert',this.cfg.handler4AlertBtn);
            // if(this.cfg.handler4CloseBtn){
            //     this.on('close',this.cfg.handler4CloseBtn);
            // }
            this.cfg.handler4CloseBtn && this.on('close',this.cfg.handler4CloseBtn);
        },

        syncUI:function(){
            //动态设置弹出框的css属性，宽高以及坐标
            this.boundingBox.css({
                width:this.cfg.width + 'px',
                height:this.cfg.height + 'px',
                left:(this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
                top:(this.cfg.y || (window.innerWidth - this.cfg.height) / 2) + 'px'
            });

            if(this.cfg.skinClassName){
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
            if(this.cfg.isDraggable){
                if(this.cfg.dragHandle){
                    this.boundingBox.draggable({handle:this.cfg.dragHandle});
                } else {
                    this.boundingBox.draggable();
                }
            }
        },
        alert:function(cfg){

            //合并Win函数里面的cfg属性和cfg参数
            $.extend(this.cfg,cfg);
            this.render();
            return this;

        },

        destructor:function(){
            this._mask && this._mask.remove();
        },
        
        confirm:function(){},
        prompt:function(){}
    });

    return {
        Win : Win
    }
});