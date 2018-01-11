(function(){

  let showCardInfo = function(data){
    console.info(data.ResultObject.State);
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      let [cardState, css, state, text] = ["", "", "", ""];
      switch(data.ResultObject.State){
        case 1:
        [cardState, css, state, text] = ["using", "icon-gou", "正用", "立即挂失"];
        break;
        case 2:
        [cardState, css, state, text] = ["lost", "icon-zliconstop01", "挂失", "取消挂失"];
        break;
        case 3:
        [cardState, css, state, text] = ["exit", "icon-cha", "退卡", "已退卡"];
        break;
      }
      $(".sure").text(text);
      $(".card-num").text(data.ResultObject.CardNo);
      $(".card-state").addClass(cardState);
      $(".card-state").find(".iconfont").addClass(css);
      $(".state-label").text(state);
      $(".card-balance").text(`￥${data.ResultObject.Money}`);
      $(".card-type").text(data.ResultObject.Grade);
    }
  };

  let init = function(){
    AlertMsg("获取信息中...");
    let fetch = new MyFetch();
    fetch.get(
      1,
      `/api/Cards/GetMyOneCard`,
      `Id=${sessionStorage.getItem("cardId")}`,
      showCardInfo
    );
  };

  init();

  let showMsg = function(data){
    HideMsg(data.Message);
    if (data.StatusCode <= 20000) {
      if ($(".sure").text() == "立即挂失") {
        $(".card-state").addClass("lost").removeClass("using");
        $(".card-state").find(".iconfont").addClass("icon-zliconstop01").removeClass("icon-gou");
        $(".state-label").text("挂失");
        $(".sure").text("取消挂失");
      }else{
        $(".card-state").addClass("using").removeClass("lost");
        $(".card-state").find(".iconfont").addClass("icon-gou").removeClass("icon-zliconstop01");
        $(".state-label").text("正用");
        $(".sure").text("立即挂失");
      }
    }else{
      alert(data.Message);
    }
  };

  $(".sure").on("click", function(){
    let text = $(this).text();
    let result;
    if (text == "立即挂失") {
      result = confirm("确定挂失？");
      if (result) {
        AlertMsg("挂失中...");        
        let fetch = new MyFetch();
        fetch.send(
          1,
          `/api/Cards/ReportLoss`,
          `Id=${sessionStorage.getItem("cardId")}`,
          showMsg
        );
      }
    }else if(text == "取消挂失"){
      result = confirm("取消挂失");
      if (result) {
        AlertMsg("取消挂失中...");
        let fetch = new MyFetch();
        fetch.send(
          1,
          `/api/Cards/CancelReportLoss`,
          `Id=${sessionStorage.getItem("cardId")}`,
          showMsg
        );
      }
    }
  });

})()