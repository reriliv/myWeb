
let checkOrder = function(){
  let orderStr = sessionStorage.getItem("order");
  let result = true;
  if (orderStr == null) {
    result = false;
  }
  return result;
  // console.log(orderStr);
};

let addOrder = function(order){
  if(!checkOrder()){
    let food = {"foodList": [], "foodNumber":"", "orderDate":""};
    let date = new Date();
    food.foodList.push(order);
    food.foodNumber = order.foodNum;
    food.orderDate = `${sessionStorage.getItem("date")} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    localStorage.setItem("order", JSON.stringify(food));
  }
};

let deleteOrder = function(order){
  if (checkOrder()) {
    let orderStr = localStorage.getItem("order");
    let orders = JSON.parse(orderStr);
    console.log(orders);
    for (let i = 0; i < orders.foodList.length; i++) {
      if(orders.foodList[i].foodId == order.foodId){
        // 
      }
    }
  }
};

let changeOrder = function(){};

let getOrder = function(){
  let str = localStorage.getItem("order");
  if (str == null) {
    alert("没有商品");
  }else{
    let order = JSON.parse(str);
    return order;
  }
};