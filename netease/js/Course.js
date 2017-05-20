
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