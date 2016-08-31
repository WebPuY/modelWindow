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
            y:50,
            width:300,
            height:150,
            title:'提示',
            content:'welcome!!!',
            // handler4CloseBtn:function(){
            //     alert('you click the close button');
            // },
            // handler4AlertBtn:function(){
            //     alert('you click the alert button');
            // },
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

    $('#b').click(function(){
        new w.Win().confirm({
            y:50,
            width:300,
            height:150,
            title:'系统消息',
            hasCloseBtn:true,
            text4CancelBtn : '否',
            text4ConfirmBtn : '是',
            content:'confirm content',
            dragHandle:'.window_header'
        }).on('confirm',function(){
            alert('sure');
        }).on('cancel',function(){
            alert('no');
        });
    });

    $('#c').click(function(){
        new w.Win().prompt({
            y:50,
            width:300,
            height:150,
            hasCloseBtn:true,
            title:'请输入您的姓名',
            text4PromptBtn : '输入',
            text4CancelBtn : '取消',
            content:'我们将保存您的信息',
            dragHandle:'.window_header',
            defaultValue4PromptInput:'张三',
            handler4PromptBtn:function(inputValue){
                alert('您输入的内容是 ' + inputValue);
            }
        }).on('cancel',function(){
            alert('取消');
        });
    });

    $('#d').click(function(){
        new w.Win().common({
            y:50,
            width:300,
            height:150,
            hasCloseBtn:true,
            content:'我是一个通用弹窗',
            dragHandle:'.window_header'
        });
    });
});