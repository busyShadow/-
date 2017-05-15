window.onload=function(){
        checkBar();//判断“不再提醒”的cookie

        var arrCount=1;//在函数banner里用，用来记录图片顺序
        var allMess=[];//在getCourse函数里，存放选项卡课程的所有信息
        var addCourseCount=0;// 0只允许选项卡中的课程触发addCourse()一次弹框 1：则不允许

        (function(){
            var close=getById("g-close");
            var log=getById("attention");
            var closelog=getById("closelog");
            var surlogin=getById("l_login");
            var cancelAtten=getById("nav-login-ca");
            addEvent(getById("g-slide1"),"mouseenter",index);
            addEvent(getById("g-slide2"),"mouseenter",index);
            addEvent(getById("g-slide3"),"mouseenter",index);
        //函数closeBar:关闭顶栏“不再提醒” 
        addEvent(close,"click",closeBar);
        //判断登录cookie是否设置，若没有设置弹出登录框，若有则调用关注api
        addEvent(log,"click",login);
        //关闭登录框 
        addEvent(closelog,"click",clog); 
        //弹出对话框  
        addEvent(surlogin,"click",sur_login);
        //取消关注函数 
        addEvent(cancelAtten,"click",canAtten);
        //轮播图鼠标移入暂停轮播
        addEvent(getById("m-banner"),"mouseover",clearInte);
        //轮播图鼠标移出开始轮播
        addEvent(getById("m-banner"),"mouseout",setInte);
        //单击产品设计选择卡显示对应课程
        addEvent(getById("first-tab"),"click",firstTab);
        //单击产品设计选择卡显示对应课程
        addEvent(getById("two-tab"),"click",twoTab);
        //单击机构介绍下图标显示视频
        addEvent(getById("alert-video"),"click",playVideo);
        //关闭弹出的视频窗口
        addEvent(getById("close-video-window"),"click",closeVideo);

        //分页器单击切换页面
        addEvent(getById("pager-one"),"click",pagerChange)
        addEvent(getById("pager-two"),"click",pagerChange)
        addEvent(getById("pager-three"),"click",pagerChange)
        addEvent(getById("pager-four"),"click",pagerChange)
        addEvent(getById("pager-five"),"click",pagerChange)
        addEvent(getById("pager-six"),"click",pagerChange)
        addEvent(getById("pager-seven"),"click",pagerChange)
        addEvent(getById("pager-nine"),"click",pagerChange)


        getCourse(2);//显示选择卡课程加载
        showNew();//显示最热排行
    })();
        // 轮播图每5s更新一次图片 
        var slid = setInterval(slide,5000);

        // 热门推荐每5s更新一次内容 
        var roll = setInterval(rollingNews,5000);

        
        function pagerChange(){
            var index = this.innerHTML;
            var lis = document.getElementById("g-pager").getElementsByTagName("li"); 
            if( Number(index) ){
                for(var i=0;i<lis.length;i++){
                    lis[i].className = "";
                }
                this.className = "g-pager-sel";
                getCourse(index);
            }
        }

        function firstTab(){
            /* 根据类型获取课程  */
            getById("two-tab").className = "h3";
            getById("first-tab").className = "";
            getCourse(1); 

        }

        function twoTab(){
            /* 根据类型获取课程  */
            getById("two-tab").className = "";
            getById("first-tab").className = "h3";
            getCourse(1); 
            
        }

        // 函数playVideo功能:单击机构介绍下图标显示视频
        function playVideo(){  
            getById("video2").style.display="block"
            if(!getById("source")){
                var source=document.createElement("source");
                source.src="http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4";
                source.type="video/mp4"
                getById ("video2").getElementsByTagName("video")[0].appendChild(source);
            }
        }

        // 函数closeVideo功能:关闭弹出的视频窗口
        function closeVideo(){
         getById("video2").style.display="none"
         /* 使视频暂停播放 */
         getById("video2").getElementsByTagName("video")[0].pause();

     }
        /* 
        通过id名找标签 
        */
        function getById(idname){
            return document.getElementById(idname);
        }
        /* 
        函数addEvent:注册事件
        */
        function addEvent(element,type,callback){
            /* document.addEventListener:chrome、safari、opera事件注册函数 */
            if(document.addEventListener){
                element.addEventListener(type,callback,false);
            }  
            /* document.attachEvent:是ie8及更早版本事件注册函数 */   
            else if(document.attachEvent){
                element.attachEvent("on"+type,callback);
            }
        }
        /*
        函数setCookie:设置cookie
        */
        function setCookie(name,value,endays){
            var date=new Date();
            /* 设置过期时间 endays为过期天数  */
            date.setTime(date.getTime()+endays*24*60*60*1000);
            var expires="expires="+date.toGMTString();
            document.cookie=name+"="+value+";"+expires;
        }
        /*
        函数getCookie:获取本地cookie,查询到name则返回cookie键为name的值
        */
        function getCookie(name){
            var name=name+"=";
            var coo=document.cookie.split(";");
            for(var i=0;i<coo.length;i++){
                var c=coo[i];
                c=toSpace(c);
                if(c.indexOf(name)==0){
                    return c.substring(name.length+1,c.length);
                }
            }
            return "";
        }
        /* 
        函数closeBar:关闭顶栏“不再提醒” 
        */
        function closeBar(){
            setCookie("loginS","loginSuc",365);
            getById("m-head").style.display="none";
        }
        function checkBar(){   
            var bar = getCookie("loginS");
            if( bar!=="" ){
                getById("m-head").style.display="none";
            }
        }
        /*
        函数login:判断登录cookie是否设置，若没有设置弹出登录框，若有则调用关注api
        */
        function login(){
            if(getCookie("followS")!="followSuc"){
                getById("login").style.display="block";

            }else{
                alert("测试结果：你之前已经登录,可直接关注");
                var xhr=ajax("http://study.163.com/webDev/attention.htm");
                xhr.onreadystatechange=function(){
                    if(xhr.readyState==4){
                        if(xhr.responseText==1){
                            alert("测试结果：调用关注api成功");
                            setAtten();
                            
                        }
                    }
                }
                if( window.XDomainRequest ){
                    xDomainReqeust(xhr);
                }
            }
        }
        /*
        关闭登录框
        */
        function clog(){
            getById("login").style.display="none";
        }
        /* 
        函数serialize：Ajax请求参数序列化，返回XMLHttpRequest对象
        */
        function ajax(url,para,code){
            function serialize(data){
                if(!data)return "";
                var arra=[];
                for(var name in data){
                    if(!data.hasOwnProperty(name)) continue;
                    if(typeof data[name]=="undefinde") continue;
                    if(code=="encode"){
                        name=encodeURIComponent(name);
                        value=encodeURIComponent(data[name]);
                    }else{
                        /* md5加密 */
                        value=hex_md5(data[name]);
                    }
                    arra.push(name +"="+ value);
                }
                return arra.join("&");
            }
            var xhr=null;
            if(!window.XDomainRequest){
                xhr=new XMLHttpRequest();
            }else{
                xhr=new XDomainRequest();
            }
            var ur=url+"?"+serialize(para);
            xhr.open("GET",ur,true);
            xhr.send(null);
            return xhr;

        }
        /*
        函数space:去除字符串多余空格,并返回去除后的字符串
        */
        function toSpace(str){
            var noSpace=new String();
            for(var i=0;i<str.length;i++){
                if(str.charAt(i)!=" "){
                    noSpace+=str.charAt(i);
                }
            }
            return noSpace;
        }

        /*
          设置关注
          */
          function setAtten(){
            getById("nav-login-ca").style.display="";
            getById("attention").id="attention2";                                          
            getById("nav-login-im").style.cssText = "background:url(./images/sprites.png) -173px -20px no-repeat";
            getById("login").style.display="none";
            getById("nav-login-atte").innerHTML="已关注";  
            setCookie("followS","followSuc",365);

        }
        /* 
        函数canAtten:取消关注 
        */
        function canAtten(event){
            event=event||window.event;
            /*  event.cancelBubble:阻止ie冒泡 */
            event.cancelBubble=true;
            /* event.stopPropagation:阻止chrome、safari、firefox冒泡 */
            event.stopPropagation();  
            getById("nav-login-ca").style.display="none";
            getById("attention2").id="attention"
            getById("nav-login-im").style.cssText = "background: url(./images/sprites.png) -140px -19px no-repeat;";
            getById("nav-login-atte").innerHTML = "关注";
            setCookie("followS","followSuc",0);   
            addEvent(getById("attention"),"click",login);
        }

        /*
        函数xDomainLogin:在ie8+登录使用跨域
        */
        function xDomainReqeust(xh){
            var xhr=xh;
            xhr.onload=function(){
                if(xhr.responseText==1){
                    if(getCookie("followS"=="")){
                        setCookie("followS","followSuc",1);
                        getById("login").style.display="none";   
                        /* 调用关注 */                       
                        setAtten();
                        /* 取消初始化关注注册事件 */
                        getById("attention2").detachEvent('click' ,login);
                        alert("测试结果：登录成功!");
                    }else{
                        setAtten(); 
                    }

                }else{
                    alert("用户名或密码输入错误，请重新输入");
                }
            }
            xhr.onerror=function(){
                alert("An error occurred.");
            }
        }

        /*
        函数sur_login:弹出登录对话框
        */
        function sur_login(){
            var user=getById("user").value;
            user=toSpace(user);
            var pwd=getById("pwd").value;
            pwd=toSpace(pwd);
            var xhr=ajax("http://study.163.com/webDev/login.htm",{userName:user,password:pwd},"hex_md5");
            /*  方法onreadystatechange:当xhr的readystate发生变化时自动触发 */
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    if(xhr.responseText==1){
                        setCookie("followS","followSuc",1);
                        getById("login").style.display="none";   
                        alert("测试结果：登录成功！");
                        /* 调用关注 */
                        setAtten();
                        /* 取消初始化关注注册事件 */
                        getById("attention2").removeEventListener('click' ,login, false);                        
                        return ;
                    }else{
                        alert("用户名或密码输入错误，请重新输入");
                        return ;
                    }
                }
            }
            /*  在ie下触发函数弹出登陆框 */
            if( window.XDomainRequest ){
                xDomainReqeust(xhr);
            }
        }   

        /*
        函数banner:结合全局对象slide(定时器)实现轮播图每5s更新一次图片,
        */
        function banner(arrCo){
            /* arrCo值配合函数index实现切换轮播图图片 */
            if(arrCo||arrCo==0){
                arrCount=arrCo;
            }
            var array=[["banner1.jpg","http://open.163.com"],["banner2.jpg","http://study.163.com"],["banner3.jpg","http://www.icourse163.org"]];
            getById("m-banner").style.backgroundImage="url(./images/"+array[arrCount][0]+")";
            getById("m-banner").href = array[arrCount][1];
            arrCount++;
            if(arrCount == 3)arrCount = 0;
            var bp = getById("g-ban-ul").style.backgroundPosition;
            /* 使轮播图下面的导航黑点移到向右移21px */
            bp = parseInt(bp)+21;
            bp += "px"
            getById("g-ban-ul").style.backgroundPosition =  bp + " " +"-58px";
            /* 当轮播图下面的导航点移到最右边时黑点移到最左边 */
            if(bp == "-58px"){
                getById("g-ban-ul").style.backgroundPosition = "-121px -58px";
            }
        }
         /*
         函数slide:使轮播图以每5ms调用100次fadeIn函数
         */
         function slide(arrCo){
                var count=0,time=0;//次数--100次
                 banner(arrCo);  //arrCo值配合函数index实现切换轮播图图片
                 /* 函数fadein:使轮播图以500ms淡入 */
                 function fadeIn(){
                    count++; 
                if(count==101){ //5*100ms
                    clearInterval(fadeI);return ;
                }
                getById("m-banner").style.opacity=time/100;
                time+=1;
            }

            var fadeI=setInterval(fadeIn,5);
        }
    // 轮播图实现点击导航点切换轮播图图片 
    function index(event){
        var ev = event || window.event;
        var target = ev.srcElement || ev.target ;
        if(target.id=="g-slide1"){
            slide(0);
            getById("g-ban-ul").style.backgroundPosition="-121px -58px";
        }
        if(target.id=="g-slide2"){
            slide(1);
            getById("g-ban-ul").style.backgroundPosition="-100px -58px";
        }
        if(target.id=="g-slide3"){
            slide(2);
            getById("g-ban-ul").style.backgroundPosition="-79px -58px";
        }
    }
            /*
            函数clearInte:清除轮播图上slid的定时器
            */
            function clearInte(){
                clearInterval(slid);
            }
            /*
            函数setInte:重新给全局对象slid定时器赋于定时
            */
            function setInte(){
                slid=setInterval(slide,5000);
            }
        /*
        函数createCourse:生成课程显示节点框
        */ 
        function createCourse(data){
            getById("g-content").innerHTML="";
            var str=new Array();
            str=data;
            /* 20门课程 */
            for(var i=0;i<20;i++){
             str[i][4]=Number(str[i][4])==0 ? "免费": "&yen"+str[i][4];
             var div=document.createElement("div");
             div.id="div"+i;
             div.className="div"+i;
             /* 生成节点 */
             getById("g-content").appendChild(div);
             /* 在生成节点添加内容 */

             getById("div"+i).innerHTML='<img src='+str[i][0]+' alt="" /> \
             <div class ="description" id ="description"> \
             <p  class ="name" id ="name">'+str[i][1]+'</p> \
             <p  class ="g-provider" id ="g-provider">'+str[i][2]+'</p> \
             <p  class ="learn-count" id ="learn-count"><span></span>'+str[i][3]+'</p> \
             <p  class ="price" id = "price">'+str[i][4]+'</p> \
             </div>'
         }
     }

        /*
        函数addCourse:鼠标移动到课程显示框时弹出浮层显示课程详情
        */
        function addCourse(event){
            this.id = "change-course";
            var index = 0;
            if(addCourseCount == 0){
                var row = (this.className).substring(3);
                var cul = (this.className).substring(3);
                index = row;
                if(row >= 0 && row <= 9){
                  row = row % 4;
              }else
              if(row>=10&&row<=11){
                  row=row%8;
              }else
              if(row>=12&&row<=15){
                  row=row%12;
              }else
              if(row>=16&&row<=19){
                  row=row%16;
              }
              if(cul==0||cul==1||cul==2||cul==3)cul=0;
              if(cul==4||cul==5||cul==6||cul==7)cul=1;
              if(cul==8||cul==9||cul==10||cul==11)cul=2;                       
              if(cul==12||cul==13||cul==14||cul==15)cul=3;
              if(cul==16||cul==17||cul==18||cul==19)cul=4;
              /* row仅用0、1、2、3来表示第几列  cul仅用0、1、2、3、4来表示第几行 */
              this.style.cssText="left:"+((row*221+row*22)-10)+"px;top:"+((cul*226+cul*19)-10)+"px";
              var div=document.createElement("div");
              div.id="apply-div"
              /* 添加辅助节点 */
              getById("g-content").insertBefore(div,this);
              getById("apply-div").style.cssText="width:221px;border:none;background-color:transparent;";
              getById("change-course").getElementsByTagName("img")[0].style.float="left";
              getById("change-course").getElementsByTagName("p")[1].innerHTML= getById("learn-count").innerHTML+"人在学";
              getById("change-course").getElementsByTagName("p")[2].innerHTML="发布者:"+"&nbsp;"+allMess[index][2];
              /* 添加课程分类节点 */
              var span=document.createElement("span");
              span.id="categoryRels";
              span.style.display="block";
              var categoryRels=allMess[index][5]==null? "无": allMess[index][5];
              getById("change-course").getElementsByTagName("div")[0].appendChild(span).innerHTML="课程分类:"+"&nbsp;"+categoryRels;
              /* 添加课程描述节点 */
              var p=document.createElement("p");
              p.id="describe";
              p.className="describe"
              getById("change-course").appendChild(p).innerHTML=allMess[index][6];
              addCourseCount++;
          }
      }
        /*
        函数removeCourse:鼠标移出课程显示框时关闭浮层显示课程详情
        */
        function removeCourse(){
            // if(window.getComputedStyle(this.querySelector("img")).float!="none"){//ie8兼容问题
            if(this.getElementsByTagName("img")[0].style.float!="none"){//ie8兼容问题
                addCourseCount=0;
                this.style.cssText="";
                var index=(this.className).substring(3);
                this.id="div"+index;
                getById("g-content").removeChild(getById("apply-div"));
                this.getElementsByTagName("img")[0].style.float="none";
                /* 恢复课程显示框弹出浮层之前的信息并去除弹出浮层所生成的节点 */
                getById("div"+index).getElementsByTagName("div")[0].removeChild(getById("categoryRels"));
                getById("div"+index).removeChild(getById("describe"));

                getById("div"+index).getElementsByTagName("p")[1].innerHTML=allMess[index][2];
                getById("div"+index).getElementsByTagName("p")[2].innerHTML= '<span></span>'+allMess[index][3];

            }
        }

      /*
      函数getCourse:根据接口来获取课程信息并 createCourse函数来创建具体的课程
      */
      function getCourse(pageNo){
        /* 全局变量,保存所有课程信息 */
        if((getById("two-tab").className)=="h3")
        { 
            Coursetype=10;
        }else {
            Coursetype=20;
        }

        allMess=[];
        var  persoMess=[];
        var xhr=ajax("http://study.163.com/webDev/couresByCategory.htm",{pageNo:pageNo,psize:20,type:Coursetype},"encode");
        xhr.onreadystatechange=function(){
          if(xhr.readyState==4){
              var xhrStr=xhr.responseText;
              xhrStr=JSON.parse(xhrStr);
              /* 显示20课程  */  
              for(var i=0;i<20;i++){  
                /* 中图 */             
                persoMess.push(xhrStr.list[i].middlePhotoUrl);
                /* 课程名 */
                persoMess.push(xhrStr.list[i].name);
                /* 机构发布者 */
                persoMess.push(xhrStr.list[i].provider);
                /* 在线学习人数 */
                persoMess.push(xhrStr.list[i].learnerCount);
                /* 价格 */
                persoMess.push(xhrStr.list[i].price);
                /* 课程分类 */
                persoMess.push(xhrStr.list[i].categoryRels);
                /* 课程描述 */
                persoMess.push(xhrStr.list[i].description);
                allMess.push(persoMess);
                persoMess=[];
            }
            /* 根据allMess数组动态生成课程信息并对每个课程框注册mouseenter与mouseleave事件 */
            createCourse(allMess);
            for(i=0;i<20;i++){
              addEvent(getById("div"+i),"mouseover",addCourse);
              addEvent(getById("div"+i),"mouseleave",removeCourse);

                  // addEvent(document.getElementsByClassName("div"+i)[0],"mouseenter",addCourse);
                  // addEvent(document.getElementsByClassName("div"+i)[0],"mouseleave",removeCourse);
              }
          }
      }
      xhr.onload=function(){
            if(window.XDomainRequest){ //仅ie执行这些语句
                var xhrStr=xhr.responseText;
                xhrStr=JSON.parse(xhrStr);
                /* 显示20课程  */  
                for(var i=0;i<20;i++){  
                    /* 中图 */             
                    persoMess.push(xhrStr.list[i].middlePhotoUrl);
                    /* 课程名 */
                    persoMess.push(xhrStr.list[i].name);
                    /* 机构发布者 */
                    persoMess.push(xhrStr.list[i].provider);
                    /* 在线学习人数 */
                    persoMess.push(xhrStr.list[i].learnerCount);
                    /* 价格 */
                    persoMess.push(xhrStr.list[i].price);
                    /* 课程分类 */
                    persoMess.push(xhrStr.list[i].categoryRels);
                    /* 课程描述 */
                    persoMess.push(xhrStr.list[i].description);
                    allMess.push(persoMess);
                    persoMess=[];
                }
                /* 根据allMess数组动态生成课程信息并对每个课程框注册mouseenter与mouseleave事件 */
                createCourse(allMess);
                for(i=0;i<20;i++){
                  addEvent(getById("div"+i),"mouseover",addCourse);
                  addEvent(getById("div"+i),"mouseleave",removeCourse);

                  // addEvent(document.getElementsByClassName("div"+i)[0],"mouseenter",addCourse);
                  // addEvent(document.getElementsByClassName("div"+i)[0],"mouseleave",addCourse);
              }
          }
      }  
  }
          /*
            函数:createCourse:生成最热排行节点与内容
            */
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

}  

