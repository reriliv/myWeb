/*let showData = function(data){
  console.info(data);
  if (data.StatusCode == 10000) {
    sessionStorage.setItem("cardId", data.ResultObject[0].Id);
  }
  data.ResultObject.List.forEach( (card, i) => {
    let [cardState, state, css] = ["", "", ""];
    switch (card.State){
      case 0:
      [cardState, css, state] = ["lost", "icon-zliconstop01", "挂失"];
      break;
      case 1:
      [cardState, css, state] = ["using", "icon-gou", "正用"];
      break;
      case 2:
      [cardState, css, state] = ["exit", "icon-cha", "退卡"];
      break;
    }*/
    // console.log(cardState, css, state);
    /*let dom = `<li class="card-item" id=${card.Id}>
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
                     <span></span>
                   </div>
                 </div>
                 <div>
                   <p>副卡：</p>
                   <ul class="second-card-list">
                   </ul>
                 </div>
               </li>`;
    $(".card-block").append(dom);*/
    /*if (card.ViceCards.length > 0) {
      card.ViceCards.forEach( (child, j) => {
        switch (child.State){
          case 0:
          [cardState, css, state] = ["lost", "icon-zliconstop01", "挂失"];
          break;
          case 1:
          [cardState, css, state] = ["using", "icon-gou", "正用"];
          break;
          case 2:
          [cardState, css, state] = ["exit", "icon-cha", "退卡"];
          break;
        }
        console.info(child);
        let childDom = `<li class="secondCard-item">
                          <span class="secondCard-name">${child.CardNo}</span>
                          <span class=${cardState}><i class="iconfont ${css}"></i>${state}</span>
                        </li>`;
        $(".card-block").find(".card-item").eq(i).find(".second-card-list").append(childDom);
      });
    }*/
/*  });
};

let getCard = function(){
  fetch("http://120.24.227.174:402/api/Cards/GetMyCards", 
        {
          method: "GET",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                     "Authorization": localStorage.getItem("token")
                   }
        }).then(function(res){
    console.info(res);
    if (res.ok) {
      res.json().then(function(data){
        showData(data);
      });
    }
  }, function(err){
    console.error(err);
  });
};*/