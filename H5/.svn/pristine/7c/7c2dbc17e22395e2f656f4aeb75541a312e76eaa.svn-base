(function(){

  let page_index = 1;

  let setPosition = function(){
    let [clientW, clientH] = [$(window).width(), $(window).height()];
    $("section").css({"width":clientW, "overflow":"hidden"});
    $(".breakfast").width(clientW);
    $(".lunch").width(clientW);
    $(".dinner").width(clientW);
  };

  let checkAll = function(){
    let [item, result] = [$(".detail-item"), true];
    for (let i = 0; i < item.length; i++) {
      if (!item.eq(i).find("input[type='checkbox']").prop("checked")) {
          result = false;
          break;
      }
    }
    let allBtn = item.parent().parent().next().find(".select-all");
    if (result) {
      // 全选
      allBtn.find(".check-img").addClass("checked");
      allBtn.find("input[type='checkbox']").prop("checked", true);
    }else{
      // 不全选
      allBtn.find(".check-img").removeClass("checked");
      allBtn.find("input[type='checkbox']").prop("checked", false);
    }
  };

  let resetDetail = function(index){
    // 删除其他节点的菜品详情
    console.log(index);
    let item = $(".record-item");
    item.find(".detail-item").remove();
    // 重置其他节点的
    item.find(".check-img").removeClass("checked");
    item.find("input").prop("checked", false);
  };

  setPosition();
  $(".record-list").on("click", ".food-time", function(){
    // 重置其他节点的菜品详情
    resetDetail($(this).parent().parent().parent().index());
    let allBtn = $(this).parent().parent().next().find(".select-all");
    allBtn.find(".check-img").removeClass("checked");
    allBtn.find("input").prop("checked", false);
    if($(this).attr("class").includes("check-detail")){
      // 隐藏详情
      hideDetail();
    }else{
      // 显示详情
      let _itemIndex = $(this).parent().parent().parent().index();  //当前订单的下标
      $(".food-time").removeClass("check-detail");
      $(this).addClass("check-detail");
      let [_index, _ul, _date, _time] = [
                            $(this).index(),
                            $(this).parent().parent().next().find("ul"),
                            $(this).parent().prev().find(".date").text(),
                            $(this).attr("id")
                          ];
      let fetch = new MyFetch();
      AlertMsg("获取信息中...");
      fetch.get(
        1,
        `/api/MyOrdering/MyOrderingDetail`,
        `Date=${_date}&TimeId=${_time}`,
        showDetail
      );
      $(".record-item").not($(".record-item").eq(_itemIndex)).find(".record-detail").slideUp(250, "linear");
      let _detail = $(this).parent().parent().next();
      console.log(_detail.css("display"));
      if (_detail.css("display") == "none") {
        _detail.slideDown(250, "linear");
      }
      _detail.find("ul").eq(_index).show().siblings("ul").hide();
    }
  });

  let showDetail = function(data){
    console.log(data);
    HideMsg(data.Message);
    let [_index, _timeIndex] = [$(".check-detail").parent().parent().parent().index(), $(".check-detail").index()];
    let item = $(".record-item").eq(_index).find(".record-food-block ul").eq(_timeIndex);
    item.find("li").remove();
    if (data.StatusCode == 10000) {
      data.ResultObject.forEach( (food, i) => {
        // console.log(i);
        let dom = `<li class="detail-item" id=${food.MealTimeMealsId}>
                     <span class="record-checkbox">
                       <label for=${i} class="check-img"></label>
                       <input id="${i}" type="checkbox"/>
                     </span>
                     <span class="record-icon"><img src="${food.Photo}" alt="菜图"/></span>
                     <span class="record-info">
                       <span class="record-name">${food.MealsName}</span>
                       <span class="record-state">${food.State}</span>
                     </span>
                     <span class="record-msg">
                       <span class="record-price">￥${food.MealUnitPrice}</span>
                       <span class="record-num">X${food.MealCount}</span>
                     </span>
                   </li>`;
        item.append(dom);
      });
    }
  };

  $(".book-block").on("click", ".check-img", function(){
    let _img = $(this);
    console.log(_img.attr("class"));
    if (_img.attr("class").includes("checked")) {
      _img.removeClass("checked");
      // _img.next().prop("checked", false);
      console.log(0);
    }else{
      _img.addClass("checked");
      // _img.next().prop("checked", true);
      console.log(1);
    }
    let _id = _img.attr("for");
    if (JSON.stringify(_id).includes("all")) {
      // let _uls = $(this).parent().parent().parent().prev(".record-food-block").find("ul");
      setTimeout(function(){SelectAll();}, 50);
    }else{
      // console.log("chceckall");
      setTimeout(function(){checkAll();}, 50);
    }
  });

  let SelectAll = function(){
    let list = $(".record-item");
    for (let i = 0; i < list.length; i++) {
      // 遍历所有订单
      let _detail = list.eq(i).find(".record-detail");
      if (_detail.css("display") == "block") {
        // 查找当前显示的订单
        // console.log(_detail.parent().index());
        let _checked = _detail.find(".select-all input");
        // console.log(_checked.prop("checked"));
        let _ul = _detail.find("ul");
        for (let k = 0; k < _ul.length; k++) {
          // 遍历该订单当前显示的列表详情
          let _item = _ul.eq(k);
          if (_item.css("display") == "block") {
            // 查找当前显示的列表详情
            console.log(_checked.prop("checked"));
            if (_checked.prop("checked")) {
              // 全选
              _item.find(".check-img").addClass("checked");
              _item.find("input[type='checkbox']").prop("checked", true);
              break;
            }else{
              // 不全选
              _item.find(".check-img").removeClass("checked");
              _item.find("input[type='checkbox']").prop("checked", false);
              break;
            }
            continue;
          }
        }
        break;
      }
    }
  };

  $(".record-list").find(".record-order p").first().on("click", function(){
    hideDetail();
  });

  $(".check-detail").on("click", function(){
    hideDetail();
  });

  let hideDetail = function(){
    $(".record-detail").slideUp(250, "linear");
    $(".food-time").removeClass("check-detail");
    // $(".food-time").removeClass("check-detail");
  };

  let showData = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      if (data.ResultObject.List.length > 0) {
        data.ResultObject.List.forEach( (item, i) => {
          let [state, color] = ["", ""];
          let photo = null;
          if (item.Photos != null && item.Photos.length > 0) {
            photo = item.Photos[0];
          }
          let [timeDom, ulDom] = [``, ``];
          item.MealTimes.forEach( (timeItem, j) => {
            timeDom += `<a class="food-time" id=${timeItem.Id}>${timeItem.Name}</a>`;
            // let _this = $(".record-list").find(".record-item").eq(i);
            // _this.find(".record-order p").last().append(timeDom);
            ulDom += `<ul style="display: none;"></ul>`;
            // _this.find(".record-food-block").append(ulDom);
          });
          let _index = 0;
          if ($(".record-item").length/10 >= 1) {
            _index = $(".record-item").length + i;
          }
          console.log($(".record-item").length);
          let dom = `<li class="record-item">
                       <div class="record-order">
                         <p>
                           <span class="date">${item.Date}</span>
                           <span class="sum">总金额：￥<span>${item.AllMoney}</span></span>
                         </p>
                         <p>
                           ${timeDom}
                         </p>
                       </div>
                       <div class="record-detail">
                         <div class="record-food-block">
                           ${ulDom}
                         </div>
                         <div class="detail-bottom">
                           <span class="select-all">
                             <span class="record-checkbox">
                               <label for="all_${_index + i}" class="check-img"></label>
                               <input id="all_${_index + i}" type="checkbox"/>
                             </span>
                             全选
                           </span>
                           <a class="cancel-order">取消订单</a>
                         </div>
                       </div>
                     </li>`;
          $(".record-list").append(dom);
        });
        if (data.ResultObject.List.length < 10) {
          $(".record-list").append(`<li class="record-all-show">已显示所有订单</li>`);
        }
      }else if($(".record-item").length == 0){
        let [_clientH, _headerH] = [$(window).height(), $(".header-block").height()];
        let _height = _clientH - _headerH;
        $(".record-list").append(`<li class="record-default" style="line-height: ${_height}px;">暂无记录</li>`);
      }else{
        $(".record-list").append(`<li class="record-all-show">已显示所有订单</li>`);
      }
    }
  };

  let init = function(){
    let fetch = new MyFetch();
    AlertMsg("获取信息中...");
    fetch.get(
      1,
      `/api/MyOrdering/MyOrderingList`,
      null,
      showData
    );
  };

  init();

  $(window).resize(function(){
    setPosition();
  });

  $(".book-block").on("click", ".cancel-order", function(){
    let result = confirm("确定取消订单?");
    if (result) {
      console.log("取消订单中...");
      AlertMsg("取消订单中...");
      let foodList = [];
      let _ul = $(this).parent().prev(".record-food-block").find("ul");
      for (let i = 0; i < _ul.length; i++) {
        if (_ul.eq(i).css("display") == "block") {
          let _item = _ul.eq(i).find(".detail-item");
          for (let j = 0; j < _item.length; j++) {
            // console.log(_item.eq(j).find("input[type='checkbox']").prop("checked"));
            if (_item.eq(j).find("input[type='checkbox']").prop("checked")) {
              foodList.push({"Id":_item.eq(j).attr("id")});
            }
          }
        }
      }
      AlertMsg("取消订单中...");
      let fetch = new MyFetch();
      fetch.send(
        1,
        `/api/Ordering/CancelOrdering`,
        `jsonString=${JSON.stringify(foodList)}`,
        cancelOrder
      );
    }
  });

  let cancelOrder = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      // window.location.href = window.location.href;
      setTimeout(function(){
        let fetch = new MyFetch();
        AlertMsg("获取信息中...");
        $(".record-list").find("li").remove();
        fetch.get(
          1,
          `/api/MyOrdering/MyOrderingList`,
          null,
          showData
        );
      }, 1000);
    }
  };

  // let beforeScroll = 0;

  /*let showMore = function(){

    let [_startX, _moveX] = [null, null];

    $(".book-block").on("touchstart", function(e){
      let touch = e.originalEvent.targetTouches[0];
      _startX = touch.pageX;
    });

    $(".book-")

  };*/

  $(document).scroll(function(){
    // alert("滚动");
    let [_top, block_height, _height, _headerH] = [
                                          $(this).scrollTop().toFixed(0),
                                          $(".record-list").height(),
                                          $(window).height(),
                                          $(".header-block").height()
                                        ];
    // console.log($(this).prop("scrollHeight"));
    console.log(`滚动条高度：${_top}`, `窗口高度：${_height}`, `滚动区高度：${block_height}`, `头部栏高度：${_headerH}`);
    console.log(block_height - _top - _height + _headerH);
    if ((block_height - _top - _height + _headerH - 1).toFixed(0)*1 <= 2 && $(".record-all-show").length == 0) {
      page_index += 1;
      console.log("到底了");
      // let item = $(".record-item");
      // let _index = item.length / 10;
      // 请求接口
      AlertMsg("获取数据中...");
      let fetch = new MyFetch();
      fetch.get(
        1,
        `/api/MyOrdering/MyOrderingList`,
        `PageIndex=${page_index}&PageSize=10`,
        showData
      );
    }
    // beforeScroll = _top + _height - _headerH + 1;
    // console.log(`滚动条高度：${_top}`, `窗口高度：${_height}`, `滚动区高度：${block_height}`);
    // console.log(beforeScroll);
    /*if (_top - beforeScroll > 0) {
      if (block_height - _height - _top == 0) {
        AlertMsg("获取数据中...");
        let item = $(".record-item");
        let _index = item.length / 10;
        // 请求接口
        let fetch = new MyFetch();
        fetch.get(
          1,
          `/api/MyOrdering/MyOrderingList`,
          `PageIndex=${_index}`,
          showData
        );
      }
    }
    beforeScroll = _top;*/
  });

})()
