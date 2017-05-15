;(function(){
    
    var $add_task_form = $('.add-task')
        ,task_item_index = 0
        ,task_item_desc_index
        ,task_status
        ,$task_detail_mask = $('.task-detail-mask')
        ,$task_detail = $('.task-detail')
        ,$task_list = $('.task-list')
        ,$task_detail_update = $('.update')
        ,$task_item_desc = $('textarea')
        ,$date_time = $('#datetimepicker')
        ,$content_title = $('.task-detail .content')
        ;

    // 初始化任务列表
    init();
    
    $add_task_form.on('submit', add_task);
    $task_list.on('click', '.detail' , show_detail_task);
    // $task_list.on('click', '.check-status' , function(){
    //     var $this = $(this);
    //     var $checkbox = $this.children();
    //     checkbox_status($this ,$checkbox);
    // });
    $task_list.on('click', '.check-status', checkbox_status);
    
    $task_detail_update.on('click', task_detail_update);
    
    $($task_detail_mask).on('click',  hide_task_detail);
    
    $date_time.datetimepicker();
    
    function add_task(event){
        event.preventDefault();
        var $task_item = $add_task_form.find('input[type=text]').val();
        
        // 存取localstorage
        if(!$task_item) return;
        task_item_index++;
        store.set("task_item" + task_item_index , $task_item);
        
        // 插入任务列表
        $('.task-list').prepend( mould($task_item, task_item_index) );
        
        // 注册删除事件
        task_delete( $('.task-item .task-function:last-child').find('span:first') );
        
        // 清除input[type=text]值
        $add_task_form.find('input').val("");
    }
    
        function task_delete($task_ftn){
             // 删除localStorage记录
             $task_ftn.on('click', function(){
                 sweet_alert($(this));
                });     
        }
        
        function sweet_alert($task_ftn){
            swal({
                title: "Are you sure?",
                text: "You will not be able to change!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false 
            }, 
            function(){ 
                console.log($task_ftn);
                var index = $task_ftn.parent().attr("data-task-item");
                $task_ftn.parent().parent().remove();
                store.remove("task_item"+ index);
                store.remove("task_item_desc" + index);
                store.remove("task_item_time" + index);
                store.remove("task_status" + index);
                // swal("Deleted!", "Your imaginary file has been deleted.", "success");
                swal({
                    title: "Deleted!",
                    text: "已经成功删除",
                    type: "success",
                    timer: 1000,
                    showConfirmButton: false
                });
                }
            );
        }
  
    
        function show_detail_task(event){
            
            var $this = $(this)
                ,detail_num = 0
                ,detail_desc = ""
                ,detail_time = 0
            ;
            
            detail_num = $this.parent().attr("data-task-item")
            $content_title.val( store.get("task_item" + detail_num) );
            task_item_desc_index = detail_num;
            // 获取详情任务描述、提醒时间
            detail_desc = store.get("task_item_desc" + detail_num);
            detail_time = store.get("task_item_time" + detail_num);
            
            $task_item_desc.val( detail_desc );
            $date_time.val( detail_time );
            // 显示任务详情
            $task_detail_mask.show();
            $task_detail.show();
             
        }
        
        function init(){
            store.forEach( function(key, data){
                var key_name = key.replace(/[0-9]+/g, "");
                var key_num = key.replace(/[^0-9]/g, "");
                switch (key_name) {
                    case 'task_item':
                        task_item_index = key_num;
                        if( store.get("task_status" + key_num ) ) {
                              $task_list.append(mould(data, key_num));
                             addclass(key_num);
                        }else{
                              $task_list.prepend(mould(data, key_num));
                        }
                        
                        break;
                    default:
                        // code
                }    
                    
                });
                // 注册删除事件
             var $task_ftn = $('.task-function').find('span:first');
             task_delete($task_ftn);
        }
        
        function addclass (index){
             $('span[data-task-item =' + index +']').parent().addClass('complete');
        }
        function removeclass(index){
            $('span[data-task-item =' + index +']').parent().removeClass('complete');
        }
        function hide_task_detail(){
            $task_detail_mask.hide();
            $task_detail.hide();
            $task_item_desc.val("");
            $date_time.val("");
        }
        
        function task_detail_update(){
            
            var $task_item_desc = $('textarea').val()
                ,time = $date_time.val()
                ;
            // 更新详情任务描述
            if( $task_item_desc !== "" ){
                store.set("task_item_desc" + task_item_desc_index, $task_item_desc);
            }
            // 更新提醒时间
            if( time !== ""){
                store.set("task_item_time" + task_item_desc_index, time);
                alarm(time);
            }
            // 更新任务列表的标题
            $('.task-function[data-task-item = ' + task_item_desc_index +']')
            .prev()
            .text( $content_title.val() );
            // 更新任务列表标题
            store.set('task_item' + task_item_desc_index, $content_title.val() )
            hide_task_detail();
        }
        
        function checkbox_status(){
            var $this = $(this);
            var $checkbox = $this.children();
            var num = $this.nextAll('.task-function').attr('data-task-item');
            if( $checkbox.is(':checked' )){
                store.set('task_status' + num, true);
                $task_list.append($this.parent());
                addclass(num);
            }else{
                store.set('task_status' + num, false);
                $task_list.prepend($this.parent());
                removeclass(num);
            }
        }
        
        function alarm(value){
            var now_date = new Date();
            var alarm_date = new Date(value);
            var $audio = $('audio')[0];
            if(alarm_date - now_date >0 ){
                setTimeout(function() {
                    $audio.play();
                }, alarm_date-now_date);    
            }
            
        }
        function mould($task_item, index){
            var check_status = store.get( 'task_status' + index )? 'checked' : "";
            var task_list =
                '<div class="task-item" > \
                    <span class="check-status"> <input type="checkbox" '+ check_status + '/></span> \
                    <span class="task-content">'+ $task_item +'</span> \
                    <span class="task-function" data-task-item="'+ index +'"> \
                        <span class="delete">删除</span> \
                        <span class="detail">详情</span> \
                    </span> \
                </div>';
                
                return task_list;
        }
        
        
})()