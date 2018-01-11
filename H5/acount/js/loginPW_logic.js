(function(){

  let init = function(){

    let showData = function(data){
      console.log(data);
      if (data.StatusCode == 10000) {
        $("#oldPwd").show();
      }
    };

    let fetchCheck = new MyFetch();
    fetchCheck.send(
      1,
      `/api/Setting/CheckHasLoginPassword`,
      null,
      showData
    );
  };
  init();

  let checkPW = function(){
    let [items, result] = [$(".pw-item"), true];
    for (let i = 0; i < items.length; i++) {
      if (items.eq(i).find("input[type='password']").val() == "") {
        result = false;
        break;
      }
    }
    if ($(".new-password").val().length != $(".confirm-new-password").val().length) {
      result = false;
    }
    return result;
  };

  $("input[type='password']").keyup(function(){
    if (checkPW()) {
      $(".confirm-change-btn").removeClass("disabled");
    }else{
      $(".confirm-change-btn").addClass("disabled");
    }
  });

  let readMessage = function(data){
    alert(data.Message);
    if (data.StatusCode == 10000) {
      window.location.href = "../login.html";
    }
  }

  $(".confirm-change-btn").on("click", function(){
    if (!$(this).attr("class").includes("disabled")) {
      console.info("修改");
      let [oldPwd, newPwd, confirmPwd] = [$(".old-password").val(), $(".new-password").val(), $(".confirm-new-password").val()];
      let fetch = new MyFetch();
      fetch.send(
        1,
        `/api/Setting/SetLoginPassword`,
        `OldPassword=${oldPwd}&NewPassword=${newPwd}&ConfirmNewPassword=${confirmPwd}`,
        readMessage
      );
      /*fetch(
        `http://120.24.227.174:402/api/Setting/SetLoginPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Authorization": localStorage.getItem("token")
          },
          body: `OldPassword=${oldPwd}&NewPassword=${newPwd}&ConfirmNewPassword=${confirmPwd}`
        }
      ).then(function(res){
        if (res.ok) {
          res.json().then(function(data){
            readMessage(data);
          });
        }
      }, function(err){
        console.error(err);
      });*/
    }else{
      console.error("不能修改");
    }
  });

})()