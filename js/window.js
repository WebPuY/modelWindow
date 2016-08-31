define(['widget','jquery','jqueryUI'],function(widget,$,$UI){

    function Win(){
        this.cfg = {
            width:500,
            height:300,
            content:'',
            title:'系统消息',
            hasCloseBtn:false,
            skinClassName:null,
            hasMask:true,
            isDraggable:true,
            dragHandle:null,
            text4AlertBtn:'OK',     //alert弹窗确定按钮
            text4ConfirmBtn:'确定',   //confirm弹窗的确定按钮
            text4CancelBtn:'取消',    //confirm弹窗的取消按钮
            handler4AlertBtn:null,   //点击alert弹窗确定按钮后的回调函数
            handler4CloseBtn:null,
            handler4ConfirmBtn:null,    //点击confirm弹窗确定按钮后的回调函数
            handler4CancelBtn:null,      //点击confirm弹窗取消按钮后的回调函数
            text4PromptBtn:'确定',
            handler4PromptBtn:null,
            maxlength4PromptInput:10,
            isPromptInputPassword:false,
            defaultValue4PromptInput:''
        };

        this.handlers = {};
    }

    Win.prototype = $.extend({},new widget.Widget(),{

        renderUI:function(){
            var footerContent = '';
            switch(this.cfg.winType){
                case 'alert':
                    footerContent = '<input type="button" value="'+ this.cfg.text4AlertBtn +'" class="window_alertBtn" />';
                    break;
                case 'confirm':
                    footerContent = '<input type="button" value="'+ this.cfg.text4ConfirmBtn +'" class="window_confirmBtn" /><input type="button" value="'+ this.cfg.text4CancelBtn +'" class="window_cancelBtn" />';
                    break;
                case 'prompt':
                    this.cfg.content += '<p class="window_promptInputWrapper"><input type="'+(this.cfg.isPromptInputPassword ? "password" : "text")+'" value="'+ this.cfg.defaultValue4PromptInput+'" maxlength="'+this.cfg.maxlength4PromptInput+'" class="window_promptInput" /></p>';
                    footerContent = '<input type="button" value="'+ this.cfg.text4PromptBtn +'" class="window_promptBtn" /><input type="button" value="'+ this.cfg.text4CancelBtn +'" class="window_cancelBtn" />';
                    break;
            }

            this.boundingBox = $(
                '<div class="window_boundingBox">'+
                    '<div class="window_body">'+this.cfg.content+'</div>'
                +'</div>');

            if(this.cfg.winType != 'common'){
                this.boundingBox.prepend('<div class="window_header">'+ this.cfg.title+'</div>');
                this.boundingBox.append('<div class="window_footer">'+footerContent+'</div>');
            }

            if(this.cfg.hasMask){
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
            }

            if(this.cfg.hasCloseBtn){
                this.boundingBox.append('<span class="window_close">X</span>');
            }
            this.boundingBox.appendTo(document.body);

            this._promptInput = this.boundingBox.find('.window_promptInput');
        },

        bindUI:function(){
            var that = this; 
            this.boundingBox.delegate('.window_alertBtn','click',function(){
                that.fire('alert');
                that.destory();
            }).delegate('.window_close','click',function(){
                that.fire('close');
                that.destory();
            }).delegate('.window_confirmBtn','click',function(){
                that.fire('confirm');
                that.destory();
            }).delegate('.window_cancelBtn','click',function(){
                that.fire('cancel');
                that.destory();
            }).delegate('.window_promptBtn','click',function(){
                that.fire('prompt', that._promptInput.val());
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

            this.cfg.handler4ConfirmBtn && this.on('confirm',this.cfg.handler4ConfirmBtn);

            this.cfg.handler4CancelBtn && this.on('confirm',this.cfg.handler4CancelBtn);

            this.cfg.handler4PromptBtn && this.on('prompt',this.cfg.handler4PromptBtn);
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
        destructor:function(){
            this._mask && this._mask.remove();
        },
        alert:function(cfg){

            //合并Win函数里面的cfg属性和cfg参数
            $.extend(this.cfg,cfg,{winType:'alert'});
            this.render();
            return this;

        },
        confirm:function(cfg){
            $.extend(this.cfg,cfg,{winType:'confirm'});
            this.render();
            return this;
        },
        prompt:function(cfg){
            $.extend(this.cfg,cfg,{winType:'prompt'});
            this.render();
            this._promptInput.focus();
            return this;
        },
        common:function(cfg){
            $.extend(this.cfg,cfg,{winType:'common'});
            this.render();
            return this;
        }
    });

    return {
        Win : Win
    }
});