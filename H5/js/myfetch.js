const _URL = ["http://120.24.227.174:410", "http://devwmobile.cardcity.com.cn", "http://192.168.1.66:303", "http://192.168.1.66:303"];
/*
  http://wmobile.cardcity.com.cn
  http://120.24.227.174:400
*/
class MyFetch{

  get(type, api, body, callback){
    let _url = "";
    if (body != undefined || body != null) {
      _url = `${_URL[type]+api}?${body}`;
    }else{
      _url = _URL[type]+api;
    }
    fetch(
      _url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Authorization": localStorage.getItem("token")
        }
      }
    ).then(function(res){
      res.json().then(function(data){
        checkStatus(data, callback);
      });
    }, function(err){
      console.error(err);
    });
  };

  send(type, api, body, callback){
    fetch(
      _URL[type]+api,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Authorization": localStorage.getItem("token")
        },
        body: body
      }
    ).then(function(res){
      res.json().then(function(data){
        checkStatus(data, callback);
      });
    }, function(err){
      console.error(err);
    });
  }

};

let checkStatus = function(data, callback){
  if (data.StatusCode == 30001) {
    sessionStorage.setItem("returnPage", window.location.href);
    alert(data.Message);
    let _href = window.location.href;
    let arr = _href.split("/");
    //window.location.href = `http://${arr[2]}/login.html`;
window.location.href = `../login.html`;
  }else if (data.StatusCode == 30002) {
    console.log("获取弱口令");
    getWeakToken();
  }else{
    callback(data);
  }
};
