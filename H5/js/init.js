const ShowSystemInfoBack = data => {
  if(data.StatusCode == 10000){
    sessionStorage.setItem("EnterpriseName",data.ResultObject.EnterpriseName);
    sessionStorage.setItem("EnterpriseAbbName",data.ResultObject.EnterpriseAbbName);
    let EnterpriseAbbName = sessionStorage.getItem("EnterpriseAbbName");
    if (EnterpriseAbbName == undefined || EnterpriseAbbName == null) {
      loadSystemInfo();
    }
    $('title').html(EnterpriseAbbName);
    $('.EnterpriseAbbName').html(EnterpriseAbbName);
  }
}
const loadSystemInfo = () => {
  console.log('调用接口');
  const fetch = new MyFetch();
  fetch.get(
    0,
    `/api/EnterpriseParam/GetSysParam`,
    null,
    ShowSystemInfoBack
  );
};
         
const InitSystemParam = () => {
  let EnterpriseAbbName = sessionStorage.getItem("EnterpriseAbbName");
  if (EnterpriseAbbName == undefined || EnterpriseAbbName == null) {
    loadSystemInfo();
    return;
  }
  $('title').html(EnterpriseAbbName);
  $('.EnterpriseAbbName').html(EnterpriseAbbName);
}

InitSystemParam();