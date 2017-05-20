        /* 
        通过id名找标签 
        */
        function getById(idname){
        	return document.getElementById(idname);
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