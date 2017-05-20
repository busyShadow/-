        /*
        函数showNew:根据接口获取最热课程排行的数据
        */
        function showNew(){
            var perNewsMess=[];
            /* 保存所有课程信息 */
            var allNewsMess=[];
            var xhr=ajax("http://study.163.com/webDev/hotcouresByCategory.htm","");
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                  var xhrStr=xhr.responseText;
                  xhrStr=JSON.parse(xhrStr);
                  for(var i=0;i<20;i++){
                    /* 课程小图 */
                    perNewsMess.push(xhrStr[i].smallPhotoUrl);
                    /* 课程名 */
                    perNewsMess.push(xhrStr[i].name);
                    /*在线学习人数 */
                    perNewsMess.push(xhrStr[i].learnerCount);
                    allNewsMess.push(perNewsMess);
                    perNewsMess=[];
                }
                createHotCourse(allNewsMess);
            }
        }
        xhr.onload=function(){
            if(window.XDomainRequest){
                var xhrStr=xhr.responseText;
                xhrStr=JSON.parse(xhrStr);
                for(var i=0;i<20;i++){
                    /* 课程小图 */
                    perNewsMess.push(xhrStr[i].smallPhotoUrl);
                    /* 课程名 */
                    perNewsMess.push(xhrStr[i].name);
                    /*在线学习人数 */
                    perNewsMess.push(xhrStr[i].learnerCount);
                    allNewsMess.push(perNewsMess);
                    perNewsMess=[];
                }
                /* 生成最热排行节点与内容 */
                createHotCourse(allNewsMess);
            }
        }

    }
    
           // /*
           //  函数:createHotCourse:生成最热排行节点与内容
           //  */
            function createHotCourse(data){
                var Aarr=[];
                A: for(var j=0;j<20;j++){
                    var index=parseInt(Math.random()*20);
                    if(j!=0){
                        for(var a=0;a<=j;a++){
                            if(Aarr[a]==index)
                              { j--;
                                continue A;
                            }
                        }
                    }
                    Aarr.push(index);
                }
                /* 每次刷新浏览器随机获取最热排行内容 */
                for(var i=0;i<20;i++){
                    var li=document.createElement("li");
                    li.id='li'+i;
                    getById("g-new-ranking").appendChild(li);
                    var img=document.createElement("img");
                    img.src=data[Aarr[i]][0];
                    var div=document.createElement("div");
                    var p=document.createElement("p");
                    p.innerHTML=data[Aarr[i]][1];
                    var spanCount =document.createElement("span");
                    var spanBg =document.createElement("span");
                    spanBg.className = "peopleCount"
                    spanCount.innerHTML =data[Aarr[i]][2];
                    /* 添加课程图片节点 */
                    getById("li"+i).appendChild(img);
                    getById("li"+i).appendChild(div);
                    /* 添加课程名节点 */
                    getById("li"+i).getElementsByTagName("div")[0].appendChild(p);
                    /* 添加在线学习人数节点 */
                    getById("li"+i).getElementsByTagName("div")[0].appendChild(spanBg);
                    getById("li"+i).getElementsByTagName("div")[0].appendChild(spanCount);
                }
            }

        /*
        函数rollingNews:每五秒向前滚动69px更新一门热门课程
        */ 
        function rollingNews(){
            var count=0;
            function roll(){
            // var Length=window.getComputedStyle(getById("g-new-ranking")).top;
            var Length=getById("g-new-ranking").style.top;
            if(Length!="-690px"){  
                count++;
                Length=(parseInt(Length)-3)+"px";
                getById("g-new-ranking").style.top=Length;
                if(count==23){
                    clearInterval(rollTime);
                }
            }else{
                /* 当向前滚动到690px时Length重新从0开始增加 */
                Length=690+"px";
                getById("g-new-ranking").style.top="0px";  
            }
        }
        var rollTime=setInterval(roll,30);
    }
