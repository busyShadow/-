
        var arrCount=1;//在函数banner里用，用来记录图片顺序
        var allMess=[];//在getCourse函数里，存放选项卡课程的所有信息
        var addCourseCount=0;// 0只允许选项卡中的课程触发addCourse()一次弹框 1：则不允许

window.onload=function(){
        checkBar();//判断“不再提醒”的cookie
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
        addEvent(getById("g-pager"),"click",pagerChange);


        getCourse(1);//显示选择卡课程加载
        showNew();//显示最热排行
    })();
        // 轮播图每5s更新一次图片 
        var slid = setInterval(slide,5000);

        // 热门推荐每5s更新一次内容 
        var roll = setInterval(rollingNews,5000);

        
        function pagerChange(event){
            var that = event.target || event.srcElement;
            var index = that.innerHTML;   
            if(index > 2){ return ;}         
            var lis = getById("g-pager").getElementsByTagName("li"); 
            if( Number(index) ){
                for(var i=0;i<lis.length;i++){
                    lis[i].className = "";
                }
                that.className = "g-pager-sel";
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


}  

