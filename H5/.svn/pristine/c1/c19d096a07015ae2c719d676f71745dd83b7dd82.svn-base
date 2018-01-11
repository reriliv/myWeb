(function(){

  let showMsg = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "../index.html";
    }else if (data.StatusCode == 20001) {
      sessionStorage.setItem("returnPage", window.location.href);
      window.location.href = "../login.html";
    }
  };

  document.querySelector(".logout-btn").onclick = function(){
    let result = confirm("确定退出");
    if (result) {
      AlertMsg("退出登录中...");
      let fetchLogout = new MyFetch();
      fetchLogout.send(
        1,
        "/api/Passport/Logout",
        null,
        showMsg
      );
    }
  };

})()