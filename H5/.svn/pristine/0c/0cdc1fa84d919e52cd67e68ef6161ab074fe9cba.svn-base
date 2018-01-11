let _URL = ["http://120.24.227.174:400", "http://wmobile.cardcity.com.cn"];

class MyFetch{

    get(type, api, body, yescallback,errCallback){
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
                checkStatus(data, yescallback,errCallback);
            });
        }, function(err){
            console.error(err);
        });
    };

    send(type, api, body, yescallback,errCallback){
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
                checkStatus(data, yescallback,errCallback);
            });
        }, function(err){
            console.error(err);
        });
    }

};

let checkStatus = function(data, yescallback,errCallback){ 
    if (data.StatusCode>=10000&&data.StatusCode<20000) {
        yescallback();
    }else  if (data.StatusCode>=20000&&data.StatusCode<30000) {
        errCallback();
    }else   {
        if (data.StatusCode > 30000) {
            if (data.StatusCode == 30001) {
                sessionStorage.setItem("returnPage", window.location.href);
                alert(data.Message);
                let _href = window.location.href;
                let arr = _href.split("/");
                window.location.href = `http://${arr[2]}/login.html`;
            }else if (data.StatusCode == 30002) {
                console.log("获取弱口令");
                getWeakToken();
            }
        }else{
            HideMsg(data.Message);
        }
    }  
};




/*调用*/


let myfetch = new MyFetch();
myfetch.send(
  1,
  "/api/Passport/Login",
  sessionStorage.getItem("body"),
  yesCallBack,ErrCallBack
);




