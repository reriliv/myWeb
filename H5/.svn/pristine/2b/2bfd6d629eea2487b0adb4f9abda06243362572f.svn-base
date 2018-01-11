(function(){

  let getStyle = function(dom, attr){
    let result = getComputedStyle(dom, false)[attr];
    if (result.includes("px")) {
      result = result.substr(0, result.length-2)*1;
    }
    return result;
  };

  let getDom = function(selector){
    return  document.querySelector(selector);
  };

  let getDoms = function(selector){
    return document.querySelectorAll(selector);
  }

  let setModuleSize = function(selector){

    let objs = getDoms(selector);

    let header = getDom("header");
    let [clientW, clientH] = [window.screen.availWidth, window.screen.availHeight];

    let [ moduleItem, headerH ] = [ getDoms(selector), getDom("header").offsetHeight ];

    let [pt, pb] = [getStyle(header, "paddingTop"), getStyle(header, "paddingBottom")];

    for (let i = 0; i < moduleItem.length; i++) {
      moduleItem[i].style.width = `${clientW/2 - 1}px`;
    }

    let navItem = getDoms(".nav-item");
    let navItemW = (window.screen.availWidth-2)/2;
    console.info(navItem);
    console.info(navItemW);
    for (let i = 0; i < navItem.length; i++) {
      navItem[i].style.width = `${navItemW}px`;
    }
  };
  setModuleSize(".module-item");
  window.onresize = function(){
    setModuleSize(".module-item");
  };

  let removeClass = function(obj, className){
    for (let i = 0; i < obj.length; i++) {
    	obj[i].classList.remove(className);
    }
  };

  let clickEvent = function(){
    let events = getDoms(".nav-item");
    console.log(events);
    for (let i = 0; i < events.length; i++) {
    	events[i].onclick = function(){
    	  removeClass(events, "selected");
    	  console.log(events[i].classList);
    	  events[i].classList.add("selected");
    	}
    }
  };

  clickEvent();

/*  //判断是否微信登陆
  let isWeiXin = function() {
    var ua = window.navigator.userAgent.toLowerCase();
    console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  if(isWeiXin()){
    console.log(" 是来自微信内置浏览器");
  }else{
    console.log("不是来自微信内置浏览器");
  }*/

})()