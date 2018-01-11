(function(){

  let showData = function(data){
    console.info(data);
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      data.ResultObject.List.forEach( (card, i) => {
        let [cardState, state, css] = ["", "", ""];
        switch (card.State){
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
        let dom = `<li class="card-item" id=${card.Id} data-priority=${card.Priority}>
                     <div class="card-info">
                       <div>
                         <a class="card-num">${card.CardNo}</a>
                         <span class="card-state ${cardState}">
                           <span class="iconfont ${css}"></span>
                           <span class="state-label">${state}</span>
                         </span>
                       </div>
                       <div>
                         <span class="card-balance">￥${card.Money}</span>
                         <span class="card-type">${card.Grade}</span>
                       </div>
                     </div>
                   </li>`;
        $(".card-block").append(dom);
        if (card.ViceCards.length > 0) {
          let ViceCards = `<div>
                             <ul class="second-card-list">
                             </ul>
                           </div>`;
          $(".card-block").append(ViceCards);
          card.ViceCards.forEach( (child, j) => {
            switch (child.State){
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
            console.info(child);
            let childDom = `<li class="card-item" id=${child.Id}>
                         <div class="card-info">
                           <div>
                             <a class="card-num">${child.CardNo}</a>
                             <span class="card-state ${cardState}">
                               <span class="iconfont ${css}"></span>
                               <span class="state-label">${state}</span>
                             </span>
                           </div>
                           <div>
                             <span class="card-balance">￥${child.Money}</span>
                             <span class="card-type">${child.Grade}</span>
                           </div>
                         </div>
                       </li>`;
            $(".card-block").find(".second-card-list").append(childDom);
          });
        }
      });
    }
  };

  let init = function(){
    let fetch = new MyFetch();
    fetch.get(
      1,
      `/api/Cards/GetMyCards`,
      null,
      showData
    );
  };

  init();

  let clickEvent = function(){

    $(".card-block").on("click", ".card-info", function(){
      let cardId = $(this).parent().attr("id");
      sessionStorage.setItem("cardId", cardId);
      window.location.href = "./cardInfo.html";
    });

    $(".priority-btn").on("click", function(){
      if ($(this).text() == "调整支付优先级") {
        $(".card-item").addClass("change");
        $(".card-item").append("<a class='up-btn'><span class='iconfont icon-houtui'></span></a>");
        $(".card-item").append("<a class='down-btn'><span class='iconfont icon-houtui'></span></a>");
        $(this).text("确认");
      }else{
        $(this).text("调整支付优先级");
        $(".card-block").find(".up-btn").remove();
        $(".card-block").find(".down-btn").remove();
        $(".card-block").find(".card-item").removeClass("change");
      }
    });

    $(".card-block").on("click", ".up-btn", function(){
      console.log($(this).parent().attr("id"));
      let items = $(".card-item");
      if($(this).parent().prev().length > 0){
        let payOrder = $(this).parent().data("priority");
      }
    });

    $(".card-block").on("click", ".down-btn", function(){
      console.log($(this).parent().attr("id"));
      if($(this).parent().next().length > 0){
        let payOrder = $(this).parent().data("priority");
      }
    });

  }()
})()