const http=require("http");
const fs=require("fs");
const url=require("url");
const path=require("path");
const queryString=require("querystring");
const { chapterList, userList} = require('./data');

http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);//带true自动解析键：值
    var pathName=urlObj.pathname;
    if(pathName == '/login'){//登录页   
       showLogin(res);
    }else if(pathName == '/list'){//后台文章列表页
        showList(res);
    }else if(pathName == '/getfilelist'){
        res.writeHead(200,{"Content-Type":"text/html"});      
        res.end(JSON.stringify(chapterList));
    }else if(pathName == '/detail'){//阅读原文跳转页
        var listPath=path.join(__dirname,"chapter.html");
        var listContent=fs.readFileSync(listPath);
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(listContent);
    }else if(pathName == '/getDetail'){//点击的是哪一个，跳转对应页面
        var chapterId=urlObj.query.chapterId;
        for(var i=0;i<chapterList.length;i++){
            if(chapterList[i].chapterId==chapterId){
                chapterList[i].views+=1;
                res.writeHead(200,{"Content-Type":"text/plain"}) ;
                res.write(JSON.stringify([chapterList[i]]));
                res.end();   
            }
        }
    }else if(pathName == '/loginButton'){//点击登录按钮页面
        res.writeHead(200,{"Content-Type":"text/html"});      
        res.end(JSON.stringify(userList));
    }else if(pathName=='/listmanager'){//后台文章列表页面
        showManager(res);
    }else if(pathName == '/showlist'){// 后台文章列表内容
        res.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});
        res.write(JSON.stringify(chapterList));
        res.end();
    }else if(pathName=="/addChapter"){//添加文章页面
        showChapter(res);
    }else if(pathName == '/add'){
        addChapter(req,res,urlObj);
    }
    
    else if(pathName.indexOf("images")>=0&&req.method=="GET"){
        var imgSrc=path.join(__dirname,pathName);
        var imgContent=fs.readFileSync(imgSrc);
        res.writeHead(200,{"Content-Type":"image/png"});
        res.end(imgContent);       
    }else if(pathName.indexOf("css")>=0&&req.method=="GET"){
        var imgSrc=path.join(__dirname,pathName);
        var imgContent=fs.readFileSync(imgSrc);
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(imgContent);        
    }else if(pathName.indexOf("js")>=0&&req.method=="GET"){
        var imgSrc=path.join(__dirname,pathName);
        var imgContent=fs.readFileSync(imgSrc);
        res.writeHead(200,{"Content-Type":"application/x-javascript"});
        res.end(imgContent);        
    }
}).listen(8083);
console.log("server is listening 8083");

function showLogin(res){
    var loginPath=path.join(__dirname,"login.html");
    var loginContent=fs.readFileSync(loginPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(loginContent);
}
function showList(res){
    var listPath=path.join(__dirname,"chapterList.html");
    var listContent=fs.readFileSync(listPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(listContent);
}
function showManager(res){
    var managerPath=path.join(__dirname,"list.html");
    var managerPath=fs.readFileSync(managerPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(managerPath);
}
function showChapter(res){
    var addPath=path.join(__dirname,"addChapter.html");
    var addContent=fs.readFileSync(addPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(addContent);
}
function addChapter(req,res,urlObj){
    var dataStr = '';
    req.on("data",function(chunk){
        dataStr += chunk;
    })
    req.on("end",function(){
        var dataObj = queryString.parse(dataStr);
        var title = dataObj.title;
        var content = dataObj.content;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var obj={
            "chapterId": chapterList[chapterList.length-1].chapterId+1,
            "chapterName": title,
            "imgPath": "images/1442457564979540.jpeg",
            "chapterDes": content,
            "chapterContent": content,
            "publishTimer": year+"-"+month+"-"+day,
            "author": "admin",
            "views": 0
        }
        chapterList.push(obj);
        res.writeHead(200,{"Context-Type":"text/plain"});
        res.end();
    })
}