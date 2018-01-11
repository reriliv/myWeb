let getWeakToken = function(){

  let getRandomCode = function(){
    let codeArray = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    let rancode = '';
    for (let i = 0; i < 8; i++) {
      let charNum = Math.floor(Math.random() * 36);
      rancode += codeArray[charNum];
    }
    return rancode;
  }

  let getTimeStamp = function(){
    let myfetch = new MyFetch();
    myfetch.get(
      0,
      `/api/Token/GetTimeStamp`,
      null,
      getToken
    );
  };

  let getToken = function(timestamp){
    let randomCode = getRandomCode();
    let cipherText = getCipherText(randomCode, timestamp.ResultObject);
    let myfetch = new MyFetch();
    myfetch.send(
      0,
      `/api/Token/GetWeakToken`,
      `RanCode=${randomCode}&TerminalType=2&TimeStamp=${timestamp.ResultObject}&Ciphertext=${cipherText}`,
      setToken
    );
  };

  let getCipherText = function(rancode, timestamp){
    const [key, terminaltype] = ["65DA7684751248AA848C8BCC52047DA9", 2];
    let ciphertext = hex_md5(`KEY=${key}&RANCODE=${rancode}&TERMINALTYPE=${terminaltype}&TIMESTAMP=${timestamp}`);
    return ciphertext;
  }

  let setToken = function(data){
    if (data.StatusCode == 10000) {
      localStorage.setItem("token", `basic ${data.ResultObject}`);
      if (window.location.href.includes("login")) {
        let myfetch = new MyFetch();
        myfetch.send(
          1,
          "/api/Passport/Login",
          sessionStorage.getItem("body"),
          parseData
        );
      }else{
        window.location.href = "./index.html";
      }
    }else{
      HideMsg(data.Message);
    }
  };

  let parseData = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      localStorage.setItem("token", `basic ${data.ResultObject}`);
      sessionStorage.removeItem("body");
      let returnPage = sessionStorage.getItem("returnPage");
      if (returnPage != null) {
        sessionStorage.removeItem("returnPage");
        window.location.href = returnPage;
      }else{
        window.location.href = "./index.html";
      }
    }
  };

  getTimeStamp();

};