define(['jquery'],function($){
    function Widget(){ 
        this.boundingBox = null;    //属性：最外层容器
    }

 //自定义事件：观察者模式，让多个观察者对象同时监听某一个主题对象。这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。先监听有多少事件，然后依次执行一遍
    Widget.prototype = {
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
       
        render:function(container){         //方法：渲染组件
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
        },
       
        destory:function(){
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
        },

        renderUI:function(){},          //接口：增加dom节点
        bindUI:function(){},            //接口：监听事件
        syncUI:function(){},            //接口：初始化组件属性
        destructor:function(){}         //销毁组件前的处理函数
    }
    
    return {
        Widget:Widget
    }    
});