let init = function(){

  let showInfo = function(data){
    HideMsg(data.Message);
    if (data.StatusCode == 10000) {
      let info = data.ResultObject;
      if (info != null) {
        let sex = "";
        switch(info.Gender){
          case 0:
          sex = "男";
          break;
          case 1:
          sex = "女";
          break;
          case 2:
          sex = "未知";
          break;
        }
        document.querySelector(".name").value = info.PersonName;
        document.querySelector(".department").value = info.OrganisationName;
        document.querySelector(".job").value = info.JobPost;
        document.querySelector(".number").value = info.PersonCode;
        document.querySelector(".sex").value = sex;
        document.querySelector(".phone").value = info.Tel;
        document.querySelector(".email").value = info.Email;
        document.querySelector(".change-info").id = info.Id;
      }
    }
  }

  let fetch = new MyFetch();
  AlertMsg("获取信息中...");
  fetch.get(
    1,
    `/api/Member/MyInfo`,
    null,
    showInfo
  );
};
init();

let showMsg = function(data){
  HideMsg(data.Message);
};

document.querySelector(".change-info").onclick = function(obj){
  let _text = obj.target.innerText;
  if (_text == "修改信息") {
    obj.target.innerHTML = "确定修改";
    document.querySelector(".phone").readOnly = false;
    document.querySelector(".phone").select();
    document.querySelector(".email").readOnly = false;
  }else if (_text == "确定修改") {
    AlertMsg("修改信息中...");
    obj.target.innerHTML = "修改信息";
    document.querySelector(".phone").readOnly = true;
    document.querySelector(".email").readOnly = true;
    let [_phone, _email] = [document.querySelector(".phone").value, document.querySelector(".email").value];
    let _id = obj.target.id;
    let fetch = new MyFetch();
    fetch.send(
      1,
      `/api/Member/SetMyInfo`,
      `Id=${_id}&Tel=${_phone}&Email=${_email}`,
      showMsg
    );
  }
};