(function(){

  let showCardInfo = function(data){
    console.info(data);
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      /*$(".alert-msg").text(data.Message);
      HideMsg();*/
      let [cardState, state, css] = ["", "", ""];
      switch (data.ResultObject.List[0].State){
        case 1:
        [cardState, css, state] = ["using", "icon-gou", "正用"];
        break;
        case 2:
        [cardState, css, state] = ["lost", "icon-zliconstop01", "挂失"];
        break;
        case 3:
        [cardState, css, state] = ["exit", "icon-cha", "退卡"];
        break;
      }
      $(".card-state").addClass(cardState);
      $(".card-state").find(".iconfont").addClass(css);
      $(".state-label").text(state);
      $(".charge-card").attr("id", data.ResultObject.List[0].Id);
      $(".card-num").text(data.ResultObject.List[0].CardNo);
      $(".card-type").text(data.ResultObject.List[0].Grade);
      $(".remain").text(data.ResultObject.List[0].Money);
    }
  };

  let init = function(){

    $(".back-btn").attr("href", sessionStorage.getItem("lastPage"));

    let fetch = new MyFetch();
    AlertMsg("获取信息中...");
    fetch.get(
      1,
      `/api/Cards/GetMyCards`,
      null,
      showCardInfo
    );

  };

  init();

  $(".charge-item").on("click", function(){
    $(this).siblings().removeClass("choosed");
    $(this).addClass("choosed");
  });

  let showMsg = function(data){
    // console.log(data);
    if (data.StatusCode < 20000) {
      console.log(data);
      // let chargeOrder = `{"orderId":${data.ResultObject}, "orderMoney": ${$(".choosed input").val()}}`;
      localStorage.setItem("orderid", data.ResultObject);
      localStorage.setItem("order_price", $(".choosed input").val());
      sessionStorage.setItem("lastPage", window.location.href);
      window.location.href = "../payType.html";
    }else{
      alert(data.Message);
    }
  };

  // 获取支付信息
  let rechargePay = function(billNo){

  };

  $(".sure").on("click", function(){
    let [cardId, chargeMoney] = [$(".charge-card").attr("id"), $(".choosed").find("input").val()*100];
    localStorage.setItem('chargeCardId', cardId);
    let fetch = new MyFetch();
    AlertMsg("提交订单中...");
    fetch.send(
      1,
      `/api/Cards/BalanceRecharge_ReturnPayNo`,
      `Id=${cardId}&Money=${chargeMoney}`,
      showMsg
    );
  });

})()