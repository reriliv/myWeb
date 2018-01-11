(function(){

  let page_index = 1;

  let showData = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      if (data.ResultObject.List.length > 0) {
        data.ResultObject.List.forEach( (item, i) => {
          let dom = `<div class="record-item" id=${item.CardId}>
                       <div class="top">
                         <span class="record-cardNum"><span class="card-type main">主</span>${item.CardNo}</span>
                         <span class="money income">${item.OperateMoney}</span>
                       </div>
                       <div class="bottom">
                         <span class="pay-type">${item.OperateType}</span>
                         <span class="pay-time">${item.OperateDate}</span>
                       </div>
                     </div>`;
          $(".record-block").append(dom);
        });
        console.log(data.ResultObject.List.length < 10);
        if (data.ResultObject.List.length < 10) {
          $(".record-block").append(`<div class="record-all-show">已显示所有记录</div>`);
        }
      }else if($(".record-item").length == 0){
        let [_clientH, _headerH] = [$(window).height(), $(".header-block").height()];
        let _height = _clientH - _headerH;
        $(".record-block").append(`<div class="record-default" style="line-height: ${_height}px;">暂无记录</div>`);
      }else{
        $(".record-block").append(`<div class="record-all-show">已显示所有记录</div>`);
      }
    }
  };

  let init = function(){
    let fetchRecords = new MyFetch();
    AlertMsg("获取数据中...");
    fetchRecords.get(
      1,
      `/api/Cards/GetBalanceOfPaymentsRecords`,
      null,
      showData
    );
  };

  init();

  $(document).scroll(function(){
    let [_top, block_height, _height, _headerH] = [
                                          $(this).scrollTop().toFixed(0),
                                          $(".record-block").height(),
                                          $(window).height(),
                                          $(".header-block").height()
                                        ];
    // console.log(`滚动条高度：${_top}`, `窗口高度：${_height}`, `滚动区高度：${block_height}`, `头部栏高度：${_headerH}`);
    // console.log(block_height - _top - _height + _headerH);
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
        `/api/Cards/GetBalanceOfPaymentsRecords`,
        `PageIndex=${page_index}&PageSize=10`,
        showData
      );
    }
  });

})()