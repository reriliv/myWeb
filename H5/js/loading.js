(function(){

  let setLoadSize = function(){
    let [_clientW, _clientH] = [null, null];
    if (window.innerWidth)
      clientW = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
      clientW = document.body.clientWidth;
    // 获取窗口高度
    if (window.innerHeight)
      clientH = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
      clientH = document.body.clientHeight;
    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
      clientH = document.documentElement.clientHeight;
      clientW = document.documentElement.clientWidth;
    }
    console.log(clientW, clientH);
    let [_left, _top] = [(clientW - 60) / 2, (clientH - 60) / 2];
    document.querySelector(".loading").style.height = clientH +"px";
    document.querySelector(".loading").style.top = "0px";
    // console.log(document.querySelector(".loading").style);
    document.querySelector(".loader-inner").style.left = _left+"px";
    document.querySelector(".loader-inner").style.top = _top+"px";
  };

  setLoadSize();

})()