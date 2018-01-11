(function(){

  let init = function(){
    let checkData = function(data){
      console.log(data);
      if (data.StatusCode == 10000) {
        $("#oldPwd").show();
        if (data.ResultObject == "True") {
          $(".using-password").find("input[type='checkbox']").attr("checked", true);
          $("input[type='password']").removeAttr("readonly");
          $(".using-password").find(".using-check").removeClass("default").addClass("checked");
        }
      }
    };
    let fetchCheck = new MyFetch();
    fetchCheck.send(
      1,
      `/api/Setting/CheckHasPayPassword`,
      null,
      checkData
    );
  };

  init();

  let showMsg = function(data){
    alert(data.Message);
    if (data.StatusCode == 10000) {
      $("input").val("");
    }else if (data.StatusCode == 20009) {
      $(".new-password").focus();
    }
  };

  $(".using-password").on("click", function(){
    let _checked = $(this).find("input").prop("checked");
    // console.log(_checked);
    let fetch = new MyFetch();
    if (_checked) {
      $(this).find(".using-check").removeClass("checked").addClass("default");
      $(this).find("input").prop("checked", false);
    }else{
      $(this).find(".using-check").removeClass("default").addClass("checked");
      $(this).find("input").prop("checked", true);
    }
    let [oldPwd, newPwd, confirmPwd] = [
                                         "",
                                         "",
                                         ""
                                       ];
    fetch.send(
      1,
      `/api/Setting/SetPaymentPassword`,
      `OldPassword=${oldPwd}&NewPassword=${newPwd}&ConfirmNewPassword=${confirmPwd}&IsOpenPayPassword=${!_checked}`,
      showMsg
    );
  });

  let checkPW = function(){
    let [items, result] = [$(".pw-item"), true];
    for (let i = 0; i < items.length; i++) {
      if (items.eq(i+1).find("input[type='password']").val() == "") {
        result = false;
        break;
      }
    }
    if ($(".new-password").val().length != $(".confirm-new-password").val().length) {
      result = false;
    }
    return result;
  };

  let checkChange = function(data){
    alert(data.Message);
    console.log(data);
    if (data.StatusCode == 10000) {
      window.location.href = "./PassWord.html";
    }
  };

  $("input[type='password']").keyup(function(){
    if (checkPW()) {
      $(".confirm-change-btn").removeClass("disabled");
    }else{
      $(".confirm-change-btn").addClass("disabled");
    }
  });

  // http://120.24.227.174:402
  $(".confirm-change-btn").on("click", function(){
    if (!$(this).attr("class").includes("disabled")) {
      console.info("修改");
      let [oldPwd, newPwd, confirmPwd, result] = [$(".old-password").val(), $(".new-password").val(), $(".confirm-new-password").val(), $("input[type='checkbox']").prop("checked")];
      let fetch = new MyFetch();
      fetch.send(
        1,
        `/api/Setting/SetPayPassword`,
        `OldPassword=${oldPwd}&NewPassword=${newPwd}&ConfirmNewPassword=${confirmPwd}&IsOpenPayPassword=${result}`,
        checkChange
      );
    }else{
      console.error("不能修改");
    }
  });

})()