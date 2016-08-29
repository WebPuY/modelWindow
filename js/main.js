require.config({
    // 配置jquery路径和版本
    paths:{
        jquery:'../../../jquery-1.11.1.min',
        jqueryUI:'http://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min'
    }
});

// require函数，接受两个参数，第一个参数是数组格式，即需要依赖的模块，第二个参数是本模块执行的函数，函数参数的个数和前面依赖的数量一致
require(['jquery','window'],function($,w){
    $('#a').click(function(){
        var win = new w.Win();

        win.alert({
            width:300,
            height:150,
            y:50,
            content:'welcome!!!',
            // handler4CloseBtn:function(){
            //     alert('you click the close button');
            // },
            // handler4AlertBtn:function(){
            //     alert('you click the alert button');
            // },
            title:'提示',
            hasCloseBtn:true,
            skinClassName:'window_skin_a',
            text4AlertBtn:'OK',
            dragHandle:'.window_header'
        });

        win.on('alert',function(){ alert('the first alert handler');});
        win.on('alert',function(){ alert('the second alert handler');});
        win.on('alert',function(){ alert('the third alert handler');});
        win.on('close',function(){ alert('the first close handler');});
        win.on('close',function(){ alert('the second close handler');});
    });
});