
let init = function(){
  let date = new Date();
  let [year, month] = [date.getFullYear(), date.getMonth()+1];
  $(".date-input").val(`${year}年${month}月`);
};

init();

let getYM = function(){
    let _date = $(".date-input").val();
    let [_year, _month] = [_date.substring(0, 4) * 1, _date.substring(5, _date.length - 1) * 1];
    return [_year,  _month];
};

let getDays = function(year, month){
  /*获取当月天数*/
  let d = new Date(year, month, 0);
  return d.getDate();
};

let setItemSize = function(){
  let clientW = window.screen.availWidth;
  let itemW = clientW/7;
  let item = $(".month").find("li");
  item.width(itemW);
  item.height(itemW);
  item.find("p").css("line-height", `${itemW/2}px`);
  $(".today").width(itemW-2);
  $(".today").height(itemW-2);
};

let showDate = function(){
  let date = getYM();
  let parseData = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      let curr_date = $("#date").val();
      console.log(curr_date);
      if (`${date[0]}年${date[1]}月` == curr_date) {
        let _date = new Date(date[0], date[1] - 1, 1);
        let firstDay = _date.getDay();
        console.log(firstDay);
        if (firstDay == 0) {
          firstDay = 7;
        }
        let days = $(".month").find("li");
        console.log(data.ResultObject);
        data.ResultObject.forEach( (item, i) => {
          let dayItem = days.eq(i+firstDay - 1);
          let remarks = dayItem.find(".day-remarks");
          switch (item.LaCarte){
            case false:
            dayItem.data("order", false);
            break;
            case true:
            dayItem.data("order", true);
            break;
          };
          dayItem.css("color", item.Color);
          remarks.text(item.Text);
        });
      }
    }
  };
  AlertMsg("获取日期中...");
  let fetch = new MyFetch();
  fetch.get(
    1,
    `/api/Ordering/GetDiningReturnData`,
    `Date=${date[0]}-${date[1]}`,
    parseData
  );
};

let setOrderDate = function(){
  $(".month").find("li").remove();
  let YM = getYM();
  let monthLength = getDays(YM[0], YM[1]);
  let date = new Date(YM[0], YM[1]-1, 1);
  console.log(date);
  // date.setDate(1);
  let firstDay = date.getDay();
  console.log(firstDay);
  if (firstDay == 0) {
    firstDay = 7;
  }
  console.info(firstDay);
  let dom = "";
  for (let i = 0; i < firstDay-1; i++) {
  	dom = `<li></li>`;
    $(".month").append(dom);
  }
  for (let i = 0; i < monthLength; i++) {
    let _date = new Date();
    let _year = _date.getFullYear();
    let _month = _date.getMonth()+1;
    let now_date = `${_year}年${_month}月`;
    let target_date = $(".date-input").val();
    console.log(now_date, target_date);
    if (i+1 == new Date().getDate() && now_date == target_date) {
      dom = `<li class="today">
               <p>
                 <span class="day-num">${i+1}</span>
               </p>
               <p class="day-remarks"></p>
             </li>`;
      $(".month").append(dom);
    }else{
      dom = `<li class="day">
               <p>
                 <span class="day-num">${i+1}</span>
               </p>
               <p class="day-remarks"></p>
             </li>`;
      $(".month").append(dom);
    }
  }
  setItemSize();
  // showDate();
};

setOrderDate();

let changeDate = function(){

  $(".prev-month").on("click", function(){
    let date = getYM();
    let [_year, _month] = [date[0], date[1]];
    _month--;
    console.log(_month);
    if (_month == 0) {
      _year--;
      _month = 12;
    }
    $(".date-input").val(`${_year}年${_month}月`);
    console.log(_year, _month);
    setOrderDate();
    showDate();
  });

  $(".next-month").on("click", function(){
    let date = getYM();
    let [_year, _month] = [date[0], date[1]];
    _month++;
    console.log(_month);
    if (_month == 13) {
      _year++;
      _month = 1;
    }
    $(".date-input").val(`${_year}年${_month}月`);
    // console.log(_year, _month);
    setOrderDate();
    showDate();
  });

};

changeDate();

let showDock = function(time){
  $(".dock").show(time);
  $(".date-menu").show(time);
};

let hideDock = function(time){
  $(".dock").hide(time);
  $(".date-menu").hide(time);
};

$(".date-input").on("click", function(){
  showDock(0);
  let clientH = window.screen.availHeight;
  $(".dock").height(clientH);
});

$(".date-input").change(function(){
  console.info("change");
});

$('.dock').on("click", function(){
  hideDock(0);
});

$(".month").on("click", "li", function(){
  let orderable = $(this).data("order");
  console.log(orderable);
  let _day = $(this).find(".day-num").text()*1;
  let _today = $(".today").find(".day-num").text()*1;
  console.log(_day, _today);
  setItemSize();
  let date = `${getYM()[0]}-${getYM()[1]}-${$(this).find(".day-num").text()}`;
  if (_day >= _today && orderable) {
    sessionStorage.setItem("date", date);
    window.location.href = "dishes.html";
  }
});