let AlertMsg = function(msg){
	$(".alert-msg").remove();
  let dom = `<div class="alert-msg">${msg}</div>`;
  $("body").append(dom);
  $(".alert-msg").stop().animate({"top": 0}, 500);
};

let HideMsg = function(msg){
	$(".alert-msg").text(msg);
    setTimeout(function(){
      $(".alert-msg").stop().animate({"top": $(".alert-msg").height()*-1}, 500, function(){
        $(this).remove();
      });
    }, 1000);
};