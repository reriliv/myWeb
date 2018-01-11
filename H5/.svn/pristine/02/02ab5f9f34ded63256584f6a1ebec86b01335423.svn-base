(function(){

  let showDate = function(){
    let date = sessionStorage.getItem("date");
    let [_year, _month, _day] = [date.substring(0, 4), date.substring(5, 7), date.substring(8, date.length)];
    console.log(_year, _month, _day);
    document.querySelector(".choose-date").innerHTML = `${_year}年${_month}月${_day}日`;
  };

  showDate();

  let setInit = function(){
    $(".second-content").first().show();
    let [
          _headerH,
          _clientH,
          _footerH,
          _foodTypeH
        ] = [
              $(".header-block").height(),
              $(window).height(),
              $(".choose-dishes-block").height(),
              $(".food-type").height()
            ];
    $(".dishes-type").height(_clientH - _headerH - _footerH - _foodTypeH);
    $(".food-block").height(_clientH - _headerH - _footerH - _foodTypeH);
    // 设置弹出框
    setPopUp();
  };

  let checkOrder = function(data){
    console.log(data);
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      data.ResultObject.forEach( (item) => {
        let timeItem = $(".food-type-item");
        for (let i = 0; i < timeItem.length; i++) {
          let _time = timeItem.eq(i).attr("id");
          if (_time == item.Id && item.HasMeals) {
            console.log(item.IsOrdering);
            if (item.IsOrdering) {
              timeItem.eq(i).append(`<i class="order-disable"></i>`);
            }else{
              timeItem.eq(i).append(`<i class="order-able"></i>`);
            }
          }
        }
      });
    }
  };

  let setPopUp = function(){
    let [_popUp, _dock] = [$(".sure-popup"), $(".dock")];
    let [
          _clientW,
          _clientH,
          _popUpW,
          _popUpH
        ] = [
               $(window).width(),
               $(window).height(),
               _popUp.width(),
               _popUp.height()
             ];
    // console.log(`popup-height: ${_popUpH}`);
    let topStr = _popUp.css("paddingTop");
    let paddingTop = topStr.substring(0, topStr.length-2);
    _popUp.css({"top": (_clientH - _popUpH - paddingTop*2)/2, "left": (_clientW - _popUpW)/2});
    _dock.height(_clientH);
  };

  let insertFirstType = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      data.ResultObject.forEach( (typeItem, i) => {
        if (i == 0) {
          $(".food-type ul").append(`<li class="food-type-item selected" id=${typeItem.MealTimeId}>${typeItem.MealTimeName}</li>`);
          getSecType(typeItem.MealTimeId);
        }else{
          $(".food-type ul").append(`<li class="food-type-item" id=${typeItem.MealTimeId}>${typeItem.MealTimeName}</li>`);
        }
      });
      // 调用接口查看有没有点餐
      AlertMsg("获取信息中...");
      let fetch = new MyFetch();
      fetch.get(
        1,
        `/api/MyOrdering/MyOrderedTime`,
        `Date=${sessionStorage.getItem("date")}`,
        checkOrder
      );
    }
  };

  let insertSecType = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      // console.log(data.ResultObject.length == 0);
      if (data.ResultObject.length == 0) {
        // 数据为空
        $(".dishes-type-list li").remove();
        $(".dishes-content").append(`<div class="disable-dock">没有菜品</div>`);
      }else{
        // 数据不空
        $(".dishes-type-list li").remove();
        $(".disable-dock").remove();
        data.ResultObject.forEach( (timeItem, i) => {
          if (i == 0) {
            $(".dishes-type-list").append(`<li class="dishes-type-item selected" id=${timeItem.MealsCategoryId}>${timeItem.MealsTypeName}</li>`);
            $(".food-block").append(`<div class="food-list-block"></div>`);
            getFoodItem($(".food-type").find(".selected").attr("id"), timeItem.MealsCategoryId);
          }else{
            $(".dishes-type-list").append(`<li class="dishes-type-item" id=${timeItem.MealsCategoryId}>${timeItem.MealsTypeName}</li>`);
            $(".food-block").append(`<div class="food-list-block"></div>`);
          }
        });
      }
    }
  };

  let insertFoodItem = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      // $(".food-list-block li").remove();
      data.ResultObject.forEach( (foodItem, i) => {
        let dom = `<li class="food-item" id=${foodItem.MealsId}>
                     <span class="food-img"><img src="${foodItem.photos[0]}" alt="菜图"></span>
                     <span>
                       <span class="food-name">${foodItem.MealsName}</span>
                       <span class="food-price">￥${foodItem.InsidePrice}</span>
                     </span>
                     <span class="food-handle">
                       <a class="reduce-action"><span>-</span></a>
                       <input type="number" class="food-num" value="0" readonly="">
                       <a class="add-action"><span>+</span></a>
                     </span>
                   </li>`;
        let _index = $(".dishes-type .selected").index();
        $(".food-list-block").eq(_index).append(dom);
      });
      checkChoose();
    }
  };

  let getFirstType = function(){
    let fetch = new MyFetch();
    AlertMsg("获取菜品中...");
    fetch.get(
      1,
      `/api/Ordering/GetMealTimes`,
      `Date=${sessionStorage.getItem("date")}`,
      insertFirstType
    );
  };

  let getSecType = function(time){
    let fetch = new MyFetch();
    fetch.get(
      1,
      `/api/Ordering/GetMealTimeMeals`,
      `Date=${sessionStorage.getItem("date")}&MealTimeId=${time}`,
      insertSecType
    );
  };

  let getFoodItem = function(time, type){
    let fetch = new MyFetch();
    AlertMsg("获取菜品中...");
    fetch.get(
      1,
      `/api/Ordering/GetMeals`,
      `Date=${sessionStorage.getItem("date")}&MealTimeId=${time}&MealsCategoryId=${type}`,
      insertFoodItem
    );
  };

  let init = function(){
    // 请求一级菜单
    getFirstType();
  };

  setInit();

  // init();

  let getStyle = function(dom, attr){
    let result = getComputedStyle(dom, false)[attr];
    if (result.includes("px")) {
      result = result.substr(0, result.length-2)*1;
    }
    return result;
  };

  let toggleDishesList = function(){
    if ($(".choose-dishes-list").css("top") == "0px") {
      let _top = -($(".choose-dishes-item").height() + $(".choose-dishes-item").height() * $(".choose-dishes-list").find(".choose-dishes-item").length);
      $(".choose-dishes-list").stop().animate({"top": _top}, 450);
    }else{
      $(".choose-dishes-list").stop().animate({"top": 0}, 450);
    }
  };

  $(".food-type").on("click", ".food-type-item", function(){
    $(this).addClass("selected").siblings().removeClass("selected");
    // 清除二级分类及所有菜品
    $(".dishes-type-list").find("li").remove();
    $(".food-list-block").remove();
    // 请求二级菜单及三级项目
    let timeId = $(this).attr("id");
    AlertMsg("获取菜品中...");
    getSecType(timeId);
  });

  $(".dishes-type-list").on("click", ".dishes-type-item", function(){
    $(this).addClass("selected").siblings().removeClass("selected");
    $(".second-content").eq($(this).index()).show().siblings().hide();
    let _index = $(this).index();
    $(".food-list-block").eq(_index).show().siblings().hide();
    // 获取三级项目
    if ($(".food-list-block").eq(_index).find("li").length == 0) {
      let [timeId, typeId] = [$(".food-type").find(".selected").attr("id"), $(".dishes-type").find(".selected").attr("id")];
      getFoodItem(timeId, typeId);
    }
  });

  $(".choose-msg").on("click", function(){
    toggleDishesList();
  });

  let priceSum = function(){
    let items = $(".choose-dishes-list").find(".choose-dishes-item");
    let _curr = 0;
    let _sum = 0;
    for (let i = 0; i < items.length; i++) {
    	let priceStr = items.eq(i).find(".choose-item-price").text();
    	let numberStr = items.eq(i).find(".choose-item-num").text();
    	_curr = priceStr.substr(1, priceStr.length)*1;
    	_sum = _sum + (_curr.toFixed(2)*1) * (numberStr*1);
      console.log(numberStr);
    	console.log(_curr, _sum);
    }
    $(".sum-price").text(`￥${_sum}`);
  };

  let changeNum = function(selector){
  	let foodItems = $(".food-item");
    let foodNum = 0;
  	for (let i = 0; i < foodItems.length; i++) {
  	  if(foodItems.eq(i).attr("id") == selector){
  	    foodNum = foodItems.eq(i).find(".food-num").val();
  	    break;
  	  }
  	}
    console.log(foodNum);
    let items = $(".choose-dishes-list").find(".choose-dishes-item");
    for (let i = 0; i < items.length; i++) {
    	if (items.eq(i).attr("id") == selector) {
    	  items.eq(i).find(".choose-item-num").text(foodNum);
    	}
    }
  };

  $(".dishes-content").on("click", ".add-action", function(){
  	let [_id, _num, _time, _img, _name, _price] = [
                        $(this).parent().parent().attr("id"),  //菜品id
                        $(this).prev("input").val()*1,  //菜品菜品数量
                        $(".food-type").find(".selected").text(),  //时段
                        $(this).parent().prevAll()[1].childNodes[0].src,  //菜品图
                        $(this).parent().prev().find(".food-name").text(),  //菜品名称
                        $(this).parent().prev().find(".food-price").text()  //菜品单价
                      ];
    console.log(_img);
    if (_num == 0) {
    	let _this = $(this).parent().prev("span");
    	let dishesName = _this.find(".food-name").text();
      console.log(dishesName);
    	let dishesPrice = _this.find(".food-price").text();
      console.log(dishesPrice);
    	let dishesId = $(this).parent().parent().attr("id");
      console.log(dishesId);
      $(this).prev("input").val(_num + 1);
      insertOrder({
        "id": dishesId,
        "time": _time,
        "name": dishesName,
        "price": dishesPrice
      });
    }else{
      $(this).prev("input").val(_num + 1);
    }
    changeNum(_id);
    priceSum();
    // setPopUp();
  });

  let insertOrder = function(order){
    let _timeId = $(".food-type").find(".selected").attr("id");
    let dom = `<li class="choose-dishes-item" id=${order.id}>
                 <span class="choose-item-time" id=${_timeId}>${order.time}</span>
                 <span class="choose-item-name">${order.name}</span>
                 <span class="choose-item-price">${order.price}</span>
                 <span class="choose-item-num">1</span>
               </li>`;
    $(".choose-dishes-list ul").append(dom);
    // insertSureOrder();
    if ($(".choose-dishes-list").css("top") != "0px" ) {
      $(".choose-dishes-list").animate({"top": -1 * $(".choose-dishes-list").height()});
    }
  };

  $(".dishes-content").on("click", ".reduce-action", function(){
    let _num = $(this).next("input").val()*1;
    let _id = $(this).parent().parent().attr("id");
    if (_num != 0) {
    	_num = _num - 1;
      if (_num == 0) {
          let items = $(".choose-dishes-item");
          for (let i = 0; i < items.length; i++) {
          	if(items.eq(i).attr("id") == _id){
          	  items.eq(i).remove();
          	}
          }
          if ($(".choose-dishes-list").css("top") != "0px") {
            $(".choose-dishes-list").animate({"top": -1 * $(".choose-dishes-list").height()});
          }
      }
      $(this).next("input").val(_num);
      changeNum(_id);
      priceSum();
    }
  });

  let showPopUp = function(){
    $(".dock").show();
    $(".sure-popup").show();
  };

  let hidePopUp = function(){
    $(".dock").hide();
    $(".sure-popup").hide();
  };

  $(".make-order").on("click", function(){
    let orderItem = $(".choose-dishes-list").find(".choose-dishes-item");
    if (orderItem.length > 0) {
      showPopUp();
    }else{
      alert("没有选择菜品，无法下单");
    }
    insertSureOrder();
  });

  let insertSureOrder = function(){
    $(".sure-order-list").find("li").remove();
    let orderItems = $(".choose-dishes-list ul li");
    for (let i = 0; i < orderItems.length; i++) {
      $(".sure-order-list").append(orderItems.eq(i).clone());
    }
    setPopUp();
  }

  let checkChoose = function(){
    let chooseFoodList = $(".choose-dishes-list ul").find("li");
    // console.log(chooseFoodList);
    let curr_time = $(".food-type").find(".selected").text();
    for (let i = 0; i < chooseFoodList.length; i++) {
      let [_id, _time, _num] = [
                      chooseFoodList.eq(i).attr("id"),
                      chooseFoodList.eq(i).find(".choose-item-time").text(),
                      chooseFoodList.eq(i).find(".choose-item-num").text()
                    ];
      // console.log("当前时段", curr_time);
      // console.log("时段", _time);
      if (curr_time == _time) {
        let foodItems = $(".food-list-block").find(".food-item");
        for (let j = 0; j < foodItems.length; j++) {
          if(foodItems.eq(j).attr("id") == _id) {
            foodItems.eq(j).find(".food-num").val(_num*1);
          }
        }
      }
    }
  };

  let showMsg = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      // 下单成功
      sessionStorage.setItem("lastPage", window.location.href)
      // window.location.href = "../payType.html";
      window.location.href = `./orderRecord.html`;
    }else if (data.StatusCode == 20025) {
      // 输入支付密码
      showPay();
      $(".sure-popup").hide();
    }else if (data.StatusCode == 20026){
      // 密码错误
      $("#pwd").val("");
    }
  };

  let makeOrder = function(){

    let orderList = [];
    let orderItem = {
                      "Date": sessionStorage.getItem("date"),
                      "MealTimeId": "",
                      "MealsIds": []
                    };
    console.log(orderList);
    let list = $(".sure-order-list").find("li");
    let timeList = $(".food-type").find(".food-type-item");
    let pushData = function(item){
      orderList.push(item);
    };
    for (let i = 0; i < timeList.length; i++) {
      orderList.push({"Date": sessionStorage.getItem("date"), "MealTimeId": timeList.eq(i).attr("id"), "MealsIds": []});
    }
    for (let i = 0; i < orderList.length; i++) {
      for (let j = 0; j < list.length; j++) {
        if (list.eq(j).find(".choose-item-time").attr("id") == orderList[i].MealTimeId) {
          let _num = list.eq(j).find(".choose-item-num").text()*1;
          for (let k = 0; k < _num; k++) {
            orderList[i].MealsIds.push(list.eq(j).attr("id"));
          }
        }
      }
    }
    console.log(JSON.stringify(orderList))
    localStorage.setItem("orderList", JSON.stringify(orderList));
    // http://120.24.227.174:402
    AlertMsg("下单中...");
    let fetch = new MyFetch();
    fetch.send(
      1,
      `/api/Ordering/SetOrdering`,
      `jsonString=${JSON.stringify(orderList)}`,
      showMsg
    );
  };

  $(".sure-btn").on("click", function(){
    makeOrder();
  });

  $(".cancel-btn").on("click", function(){
    // $(".sure-popup").hide();
    hidePopUp();
  });

  $(".input-item").on("click", function(){
    let pwd = $("#pwd").val();
    if (pwd.length < 6) {
      pwd = pwd + $(this).text();
    }
    $("#pwd").val(pwd);
    if (pwd.length == 6) {
      let orderList = localStorage.getItem("orderList");
      console.log(orderList);
      // 请求接口
      AlertMsg("下单中...");
      let fetch = new MyFetch();
      fetch.send(
        1,
        `/api/Ordering/SetOrdering`,
        `PayPassword=${pwd}&jsonString=${orderList}`,
        showMsg
      );
    }
  });

  $(".cancel-item").on("click", function(){
    hidePay();
  });

  $(".delete-item").on("click", function(){
    let pwd = $("#pwd").val();
    if (pwd.length > 0) {
      pwd = pwd.substring(0, pwd.length - 1);
    }
    $("#pwd").val(pwd);
  });

  let showPay = function(){
    $(".dock").show();
    $(".pay-pwd").show();
  };

  let hidePay = function(){
    $(".dock").hide();
    $(".pay-pwd").hide();
  };

})()