(function(){

  let showData = function(data){
    console.info(data);
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      let [cardState, state, css] = ["", "", ""];
      switch (data.ResultObject.State){
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
      $(".card-num").text(data.ResultObject.CardNo);
      $(".card-balance").text(`￥${data.ResultObject.Money}`);
      $(".card-type").text(data.ResultObject.Grade);
      data.ResultObject.PowerSwitchstring.forEach( (item, i) => {
        $(".right-item").append(`<label>${item}</label>`);
      });
    }
  };

  let init = function(){

    let fetchGetInfo = new MyFetch();
    console.log(fetchGetInfo);
    fetchGetInfo.get(
      1,
      `/api/Cards/GetMyOneCard`,
      `Id=${sessionStorage.getItem("cardId")}`,
      showData
    );
  };

  init();
})()