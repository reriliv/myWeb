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
        let dom = `<li class="card-item" id=${card.Id}>
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
          let ViceCardsList = `<div>
                                 <ul class="second-card-list">
                                 </ul>
                               </div>`;
          $(".card-block").append(ViceCardsList);
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
                             <span class='card-type'>${child.Grade}</span>
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
    AlertMsg("获取卡列表中...");
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
    $(".card-block").on("click", ".second-card", function(){
      $(this).parent().next().find(".second-card-list").slideToggle(250);
    });

    $(".card-block").on("click", ".card-info", function(){
      let cardId = $(this).parent().attr("id");
      sessionStorage.setItem("cardId", cardId);
      window.location.href = "reportLost.html";
    });

    $(".card-block").on("click", ".secondCard-item", function(){
      // 
    });

  }()
})()